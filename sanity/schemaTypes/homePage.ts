import { defineField } from "sanity";
export default {
  name: "homePage",
  title: "Home Page",
  type: "document",

  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "validation", title: "Validation" },
    { name: "trusted", title: "Trusted" },
    { name: "change", title: "Change" },
    { name: "solution", title: "Solution" },
    { name: "differentiation", title: "Differentiation" },
    { name: "process", title: "Process" },
    { name: "testimonial", title: "Testimonial" },
    { name: "demo", title: "Demo" },
  ],

  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo"
    }),

    // Hero section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      group: "hero",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      group: "hero",
    }),

    // Validation section
    defineField({
      name: "validationTitle",
      title: "Validation Title",
      type: "string",
      group: "validation",
    }),

    defineField({
      name: "validationSubtitle",
      title: "Validation Subtitle",
      type: "text",
      group: "validation",
    }),

    defineField({
      name: "validationDescription",
      title: "Validation Description",
      type: "text",
      group: "validation",
    }),

    defineField({
      name: "validationButtonText",
      title: "Validation Button Text",
      type: "string",
      group: "validation",
    }),

    defineField({
      name: "validationButtonLink",
      title: "Validation Button Link",
      type: "string",
      group: "validation",
    }),

    // security team 
    defineField({
      name: "trustedText",
      title: "Trusted Text",
      type: "string",
      group: "trusted",
    }),

    defineField({
      name: "trustedLogos",
      title: "Trusted Logos",
      group: "trusted",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // Attacker section
    defineField({
      name: "changeBackgroundImage",
      title: "Background Image",
      type: "image",
      group: "change",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "changeSectionImage",
      title: "Section Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "change",
    }),

    defineField({
      name: "changeSmallTitle",
      title: "Small Title",
      type: "string",
      group: "change",
    }),
    defineField({
      name: "changeTitle",
      title: "Main Title",
      type: "string",
      group: "change",
    }),
    defineField({
      name: "changeDescription",
      title: "Description",
      type: "text",
      group: "change",
    }),

    //solution
    defineField({
      name: "solutionSmallTitle",
      title: "Solution Small Title",
      type: "string",
      group: "solution"
    }),
    defineField({
      name: "solutionTitle",
      title: "Solutiion Main Title",
      type: "string",
      group: "solution"
    }),
    defineField({
      name: "solutionDescription",
      title: "Solution Description",
      type: "text",
      group: "solution"
    }),

    defineField({
      name: "solutionSectionImage",
      title: "Solution Section Image",
      type: "image",
      group: "solution",
      options: {
        hotspot: true,
      },
    }),

    // differentiation
    defineField({
      name: "differentiationSectionTitle",
      title: "Differentiation Section Title",
      type: "string",
      group: "differentiation"
    }),

    defineField({
      name: "differentiationCards",
      title: "Differentiation Cards",
      type: "array",
      group: "differentiation",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    }),

    // process
    defineField({
      name: "processBackgroundImage",
      title: "Process Background Image",
      type: "image",
      group: "process",
    }),
    
    defineField({
      name: "processSmallTitle",
      title: "Process Small Title",
      type: "string",
      group: "process",
    }),

    defineField({
      name: "processTitle",
      title: "Process Title",
      type: "string",
      group: "process",
    }),

    defineField({
      name: "processCards",
      title: "Process Cards",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "number",
              title: "Number",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
            },
          ],
        },
      ],
    }),

    // testimonials
    defineField({
      name: "testimonialBackgroundImage",
      title: "Testimonial Background Image",
      type: "image",
      group: "testimonial",
    }),

    defineField({
      name: "testimonialTitle",
      title: "Testimonial Title",
      type: "string",
      group: "testimonial",
    }),

    defineField({
      name: "testimonialQuote",
      title: "Testimonial Quote",
      type: "text",
      group: "testimonial",
    }),

    defineField({
      name: "testimonialPersonName",
      title: "Person Name",
      type: "string",
      group: "testimonial",
    }),

    defineField({
      name: "testimonialPersonRole",
      title: "Person Role",
      type: "string",
      group: "testimonial",
    }),
    
    defineField({
      name: "testimonialVideoUrl",
      title: "Testimonial Video URL",
      type: "url",
      group: "testimonial",
    }),

    // demo
    defineField({
      name: "demoTitle",
      title: "Demo Title",
      type: "string",
      group: "demo",
    }),

    defineField({
      name: "demoButtonText",
      title: "Demo Button Text",
      type: "string",
      group: "demo",
    }),

    defineField({
      name: "demoButtonLink",
      title: "Demo Button Link",
      type: "string",
      group: "demo",
    }),

    defineField({
      name: "demoImage",
      title: "Demo Image",
      type: "image",
      group: "demo",
      options: {
        hotspot: true,
      },
    }),

  ],
}