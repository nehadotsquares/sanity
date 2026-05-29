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
          { title: "Engineering", value: "Engineering" },
          { title: "GTM", value: "GTM" },
          { title: "IT & Security", value: "IT & Security" },
          { title: "Marketing", value: "Marketing"  },
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
          { title: "Full Time", value: "Full Time" },
          { title: "Part Time", value: "Part Time" },
          { title: "Contract", value: "Contract" },
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
          { title: "Remote", value: "Remote" },
          { title: "Hybrid", value: "Hybrid" },
          { title: "Onsite", value: "Onsite" },
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
  preview: {
    select: {
      title: "title",
      department: "department",
      location: "location",
      locationType: "locationType",
    },

    prepare({ title, department, location, locationType }) {
      return {
        title,
        subtitle: `${department} • ${location} • ${locationType}`,
      };
    },
  },
});