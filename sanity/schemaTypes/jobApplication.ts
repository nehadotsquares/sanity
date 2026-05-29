import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobApplication",
  title: "Job Applications",
  type: "document",

  fields: [

    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    }),

    defineField({
      name: "jobSlug",
      title: "Job Slug",
      type: "string",
    }),

    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Engineering", value: "Engineering" },
          { title: "Product", value: "Product" },
          { title: "Marketing", value: "Marketing" },
          { title: "It & Security", value: "It & Security" },
          { title: "GTM", value: "GTM" },
        ],
      },
    }),

    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "resume",
      title: "Resume",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
    }),

    defineField({
      name: "portfolio",
      title: "Portfolio",
      type: "string",
    }),

    defineField({
      name: "authorized",
      title: "Authorized To Work",
      type: "string",
    }),

    defineField({
      name: "sponsorship",
      title: "Visa Sponsorship",
      type: "string",
    }),

    defineField({
      name: "whyInterested",
      title: "Why Interested",
      type: "text",
    }),

    defineField({
      name: "challenge",
      title: "Challenge Description",
      type: "text",
    }),

    defineField({
      name: "hearAboutUs",
      title: "How Did You Hear About Us",
      type: "string",
    }),

  ],

  preview: {
    select: {
      title: "jobTitle",
      department: "department",
      location: "location",
    },

    prepare(selection) {
      const { title, department, location } = selection;

      return {
        title,
        subtitle: `${department} • ${location}`,
      };
    },
  },
});