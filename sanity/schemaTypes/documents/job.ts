import { defineField, defineType } from "sanity";

export default defineType({
  name: "job",
  title: "Job",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Engineering", value: "engineering" },
          { title: "GTM", value: "GTM" },
          { title: "IT & Security", value: "it & security" },
          { title: "Marketing", value: "marketing"  },
          { title: "Product", value: "Product" },
        ],
      },
    }),

    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full Time", value: "full-time" },
          { title: "Part Time", value: "part-time" },
          { title: "Contract", value: "contract" },
        ],
      },
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "locationType",
      title: "Location Type",
      type: "string",
      options: {
        list: [
          { title: "Remote", value: "remote" },
          { title: "Hybrid", value: "hybrid" },
          { title: "Onsite", value: "onsite" },
        ],
      },
    }),

    defineField({
      name: "compensation",
      title: "Compensation",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Job Description",
      type: "richText",
    }),
  ],
});