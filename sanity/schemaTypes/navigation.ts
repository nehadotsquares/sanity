import { defineType, defineField } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
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
              name: "link",
              title: "Link",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pentestButtonText",
      title: "Pentest Button Text",
      type: "string",
    }),
    defineField({
      name: "pentestButtonLink",
      title: "Pentest Button Link",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "Contact Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "Contact Button Link",
      type: "string",
    }),
  ],
});