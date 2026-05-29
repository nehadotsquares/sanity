import { defineField, defineType } from "sanity";

export default defineType({
  name: "careerPage",
  title: "Career Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "richText",
    }),

    defineField({
      name: "careerText",
      title: "Career Text",
      type: "text",
    }),
  ],
});