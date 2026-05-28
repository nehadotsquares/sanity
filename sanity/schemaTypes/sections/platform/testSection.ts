export default {
  name: "testSection",
  title: "Test Section",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "cards",
      title: "Cards",
      type: "array",
      validation: (Rule:any) => Rule.max(10).min(1),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "iconImage",
              title: "Icon Image",
              type: "image",
            },
          ],
        },
      ],
    },
  ],
};