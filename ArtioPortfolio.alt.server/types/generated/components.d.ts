import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '';
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    Document: Schema.Attribute.Media<'files'>;
    Facebook: Schema.Attribute.String;
    Instagram: Schema.Attribute.String;
    LinkedIn: Schema.Attribute.String;
  };
}

export interface SharedTags extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tags';
    icon: 'priceTag';
  };
  attributes: {
    Tag: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.social-links': SharedSocialLinks;
      'shared.tags': SharedTags;
    }
  }
}
