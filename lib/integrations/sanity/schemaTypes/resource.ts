import { defineField, defineType } from "sanity"

export const resource = defineType({
  name: "resource",
  title: "Resources",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Videos", value: "video" },
          { title: "Webinars", value: "webinar" },
          { title: "Customer Stories", value: "customer_stories" },
          { title: "White Papers", value: "white_paper" },
          { title: "Briefs", value: "briefs" },
          { title: "Podcasts", value: "podcast" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "richText",
      hidden: ({ document }) =>
        document?.resourceType === "video",
    }),

    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ document }) =>
        document?.resourceType !== "video",
    }),

    defineField({
      name: "webinarDate",
      title: "Webinar Date",
      type: "datetime",
      hidden: ({ document }) =>
        document?.resourceType !== "webinar",
    }),

    defineField({
      name: "formHeading",
      title: "Form Heading",
      type: "string",

      hidden: ({ document }) =>
        ![
          "webinar",
          "briefs",
        ].includes(
          String(document?.resourceType ?? "")
        ),
    }),

    defineField({
      name: "podcastUrl",
      title: "Podcast URL",
      type: "url",
      hidden: ({ document }) =>
        document?.resourceType !== "podcast",
    }),

    defineField({
      name: "pdf",
      title: "PDF File",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      hidden: ({ document }) =>
        document?.resourceType !== "white_paper",
    }),

    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",

      of: [
        {
          type: "object",
          fields: [
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
              name: "image",
              title: "Image",
              type: "image",
            },
          ],
        },
      ],

      hidden: ({ document }) =>
        document?.resourceType !== "podcast",
    })
  ],

  preview: {
  select: {
    title: "title",
    media: "thumbnail",
    resourceType: "resourceType",
    publishDate: "publishDate",
  },
  prepare(selection) {
    const { title, resourceType, publishDate } = selection

    return {
      title,
      subtitle: `${resourceType || "—"} | ${
        publishDate
          ? new Date(publishDate).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )
          : ""
      }`,
      media: selection.media,
    }
  },
}
})