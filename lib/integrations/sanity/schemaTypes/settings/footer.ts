import { defineField, defineType } from "sanity";

export const footer = defineType({
	name: "footer",
	title: "Footer",
	type: "document",

	fields: [
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
		}),

		defineField({
			name: "siteMapMenu",
			title: "Site Map Menu",
			type: "reference",
			to: [{ type: "menu" }],
		}),

		defineField({
			name: "legalMenu",
			title: "Legal Menu",
			type: "reference",
			to: [{ type: "menu" }],
		}),

		defineField({
			name: "connectMenu",
			title: "Connect Menu",
			type: "reference",
			to: [{ type: "menu" }],
		}),

		defineField({
			name: "footerImage",
			title: "Footer Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
});
