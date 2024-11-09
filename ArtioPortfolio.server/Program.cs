using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common;
using System.Text.Json;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

app.MapGet("/api/content/propertyTypeAliases", (IContentTypeService contentTypeService) =>
{
    var propertyAliases = contentTypeService.GetAllPropertyTypeAliases();
    return Results.Ok(propertyAliases);
});

app.MapGet("/api/contentType/aliases", (IContentTypeService contentTypeService) =>
{
    var contentTypeAliases = contentTypeService.GetAllContentTypeAliases();
    return Results.Ok(contentTypeAliases);
});

app.MapGet("/api/contentType/ids", (string[] aliases, IContentTypeService contentTypeService) =>
{
    var contentTypeIds = contentTypeService.GetAllContentTypeIds(aliases);
    return Results.Ok(contentTypeIds);
});

app.MapGet("/api/content/{id:guid}", async (Guid id, IContentService contentService) =>
{
    var content = contentService.GetById(id);
    if (content == null)
    {
        return Results.NotFound();
    }

    var contentData = new
    {
        Id = content.Id,
        Name = content.Name,
        Content = content.GetValue<string>("pageTitle")
    };

    return Results.Ok(contentData);
});

//app.MapGet("/api/documents/{documentTypeAlias}", async (string documentTypeAlias, IContentService contentService, IContentTypeService contentTypeService) =>
//{
//    // Retrieve content type by alias
//    var contentType = contentTypeService.Get(documentTypeAlias);

//    if (contentType == null)
//    {
//        return Results.NotFound($"Content type with alias '{documentTypeAlias}' not found.");
//    }

//    // Pagination parameters
//    long pageIndex = 0;
//    int pageSize = 100; // Adjust page size as needed
//    long totalRecords;

//    // Fetch paged documents of the specified type
//    var documents = contentService.GetPagedOfType(contentType.Id, pageIndex, pageSize, out totalRecords, null);

//    return Results.Ok(documents);
//})
//.WithName("GetDocumentsByType")
//.Produces(StatusCodes.Status200OK)
//.Produces(StatusCodes.Status404NotFound);

//app.MapGet("/api/documents/{documentTypeAlias}", async (string documentTypeAlias, IContentService contentService, IContentTypeService contentTypeService) =>
//{
//    // Retrieve content type by alias
//    var contentType = contentTypeService.Get(documentTypeAlias);

//    if (contentType == null)
//    {
//        return Results.NotFound($"Content type with alias '{documentTypeAlias}' not found.");
//    }

//    // Pagination parameters
//    long pageIndex = 0;
//    int pageSize = 100; // Adjust page size as needed
//    long totalRecords;

//    // Fetch paged documents of the specified type
//    var documents = contentService.GetPagedOfType(contentType.Id, pageIndex, pageSize, out totalRecords, null);

//    // Map documents to a simplified model for response
//    var response = documents.Select(doc => new
//    {
//        Id = doc.Id,
//        Name = doc.Name,
//        Description = doc.Properties.FirstOrDefault(p => p.Alias == "description")?.GetValue()?.ToString(),
//        Tags = doc.Properties.FirstOrDefault(p => p.Alias == "tags")?.GetValue()?.ToString(),
//        Images = doc.Properties.FirstOrDefault(p => p.Alias == "images")?.GetValue()?.ToString()
//    });

//    return Results.Ok(response);
//})
//.WithName("GetDocumentsByType")
//.Produces(StatusCodes.Status200OK)
//.Produces(StatusCodes.Status404NotFound);

app.MapGet("/api/documents/{documentTypeAlias}", async (
    string documentTypeAlias,
    IContentService contentService,
    IContentTypeService contentTypeService,
    IMediaService mediaService) =>
{
    // Retrieve content type by alias
    var contentType = contentTypeService.Get(documentTypeAlias);

    if (contentType == null)
    {
        return Results.NotFound($"Content type with alias '{documentTypeAlias}' not found.");
    }

    // Pagination parameters
    long pageIndex = 0;
    int pageSize = 100; // Adjust page size as needed
    long totalRecords;

    // Fetch paged documents of the specified type
    var documents = contentService.GetPagedOfType(contentType.Id, pageIndex, pageSize, out totalRecords, null);

    // Map documents to a simplified model for response
    var response = documents.Select(doc => new
    {
        Id = doc.Id,
        Name = doc.Name,
        Description = doc.Properties.FirstOrDefault(p => p.Alias == "description")?.GetValue()?.ToString(),

        // Parse tags as a list of strings
        Tags = JsonSerializer.Deserialize<List<string>>(doc.Properties.FirstOrDefault(p => p.Alias == "tags")?.GetValue()?.ToString() ?? "[]"),

        // Parse images as a list and include only Base64 data for each image
        Images = JsonSerializer.Deserialize<List<ImageModel>>(doc.Properties.FirstOrDefault(p => p.Alias == "images")?.GetValue()?.ToString() ?? "[]")
            .Select(image =>
            {
                // Check if MediaKey is not null or empty before attempting to parse it
                if (string.IsNullOrEmpty(image.MediaKey))
                {
                    return null; // Skip this image if MediaKey is missing
                }

                var mediaItem = mediaService.GetById(Guid.Parse(image.MediaKey));

                // Log mediaItem details for debugging
                if (mediaItem != null)
                {
                    Console.WriteLine($"MediaItem ID: {mediaItem.Id}");
                    Console.WriteLine($"MediaItem Name: {mediaItem.Name}");
                    Console.WriteLine($"MediaItem FilePath: {mediaItem.GetValue<string>("umbracoFile")}");
                }
                else
                {
                    Console.WriteLine("Media item not found or MediaKey is invalid.");
                }

                if (mediaItem != null)
                {
                    var filePath = mediaItem.GetValue<string>("umbracoFile");

                    // Convert image to Base64
                    string base64Data = null;
                    if (!string.IsNullOrEmpty(filePath))
                    {
                        using var stream = mediaService.GetMediaFileContentStream(filePath);
                        if (stream != null)
                        {
                            using var memoryStream = new MemoryStream();
                            stream.CopyTo(memoryStream);
                            base64Data = Convert.ToBase64String(memoryStream.ToArray());
                        }
                    }

                    return new ImageData
                    {
                        Base64Data = base64Data // Only include Base64 data here
                    };
                }
                return null;
            }).Where(image => image != null).ToList() // Filter out nulls in case media items are missing
    });

    return Results.Ok(response);
})
.WithName("GetDocumentsByType")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);



await app.RunAsync();

// Helper classes for deserializing images and including only the necessary data in the response
public class ImageModel
{
    public string MediaKey { get; set; }
}

public class ImageData
{
    public string Base64Data { get; set; } // Only Base64 image data
}
