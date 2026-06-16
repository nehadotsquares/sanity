import {
  defineField,
  defineType,
} from "sanity"

export const resourceLead = defineType({
  name: "resourceLead",
  title: "Resource Leads",
  type: "document",

  fields: [
    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
   preview: {
    select: {
      title: "name",
      resourceType: "resourceType",
      company: "company",
    },

    prepare({
      title,
      resourceType,
      company,
    }) {
      return {
        title,
        subtitle: `${resourceType || "Unknown"}${
          company ? ` | ${company}` : ""
        }`,
      }
    },
  },
})