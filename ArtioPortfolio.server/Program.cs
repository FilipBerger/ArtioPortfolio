using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common;
using System.Text.Json;
using System.IO;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

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

app.MapGet("/api/media/{mediaId:guid}", async (Guid mediaId, IMediaService mediaService) =>
{
    // Retrieve the media item by its ID
    var mediaItem = mediaService.GetById(mediaId);
    
    if (mediaItem == null)
    {
        return Results.NotFound($"Media item with ID '{mediaId}' not found.");
    }

    // Log media item details for debugging
    Console.WriteLine($"MediaItem ID: {mediaItem.Id}");
    Console.WriteLine($"MediaItem Name: {mediaItem.Name}");
    Console.WriteLine($"MediaItem FilePath: {mediaItem.GetValue<string>("umbracoFile")}");

    var filePath = mediaItem.GetValue<string>("umbracoFile");

    if (string.IsNullOrEmpty(filePath))
    {
        return Results.NotFound($"Media item with ID '{mediaId}' does not have a valid file.");
    }

    // Convert image to Base64
    string base64Data = null;
    try
    {
        using var stream = mediaService.GetMediaFileContentStream(filePath);
        if (stream != null)
        {
            using var memoryStream = new MemoryStream();
            stream.CopyTo(memoryStream);
            base64Data = Convert.ToBase64String(memoryStream.ToArray());
        }
        else
        {
            return Results.NotFound("Unable to retrieve the media file content.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error while processing the image: {ex.Message}");
        return Results.StatusCode(500);
    }

    // Log Base64 data for debugging (could be large)
    //Console.WriteLine("filePath");
    //Console.WriteLine($"Base64 Data (First 100 characters): {base64Data?.Substring(0, 100)}");

    return Results.Ok(new { Base64Data = base64Data });
});

await app.RunAsync();
