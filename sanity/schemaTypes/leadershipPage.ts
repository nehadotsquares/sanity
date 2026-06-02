import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadershipPage",
  title: "Leadership Page",
  type: "document",

  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "leadershipHeroSection" },
        { type: "leadershipTeamSection" },
        { type: "leadershipContentSection" },
      ],
    }),
  ],

    preview: {
        prepare() {
        return {
            title: "Leadership Page",
        };
        },
    },
});