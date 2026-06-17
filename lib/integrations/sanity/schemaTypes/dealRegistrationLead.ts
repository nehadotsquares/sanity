import { defineField, defineType } from "sanity"

export default defineType({
  name: "dealRegistrationLead",
  title: "Deal Registration Lead",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Your Company",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
    }),
    defineField({
      name: "job",
      title: "Job Title",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "customerCompany",
      title: "Customer Company",
      type: "string",
    }),
    defineField({
      name: "customerWebsite",
      title: "Customer Website",
      type: "string",
    }),
    defineField({
      name: "contactFirstName",
      title: "Contact First Name",
      type: "string",
    }),
    defineField({
      name: "contactLastName",
      title: "Contact Last Name",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "penetrationTests",
      title: "Penetration Tests",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
    }),
    defineField({
      name: "consent",
      title: "Consent",
      type: "boolean",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
})