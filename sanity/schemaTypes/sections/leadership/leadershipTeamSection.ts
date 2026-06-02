import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadershipTeamSection",
  title: "Leadership Team Section",
  type: "object",

  fields: [
    defineField({
      name: "leaders",
      title: "Leaders",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
            },

            {
              name: "name",
              title: "Name",
              type: "string",
            },

            {
              name: "designation",
              title: "Designation",
              type: "string",
            },

            {
              name: "linkedin",
              title: "Linkedin",
              type: "string",
            },

            {
              name: "github",
              title: "Github",
              type: "string",
            },
            
            {
              name: "twitter",
              title: "Twitter",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Leadership Team",
      };
    },
  },
});