import { defineType, defineField } from "sanity";

export const menu = defineType({
  name: "menu",
  title: "Menu",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Menu Title",
      type: "string",
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
  ],
});