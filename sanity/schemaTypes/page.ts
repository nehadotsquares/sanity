export default {
  name: 'page',
  title: 'Page',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    
    {
      name: "description",
      title: "Description",
      type: "text",
    },

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
            {
            type: "block",
            },
        ],
    },

    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
}