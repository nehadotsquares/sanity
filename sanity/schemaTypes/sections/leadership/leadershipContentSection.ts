import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadershipContentSection",
  title: "Leadership Content Section",
  type: "object",

  fields: [
    defineField({
      name: "iconImage",
      title: "Icon Image",
      type: "image",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),

    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
});