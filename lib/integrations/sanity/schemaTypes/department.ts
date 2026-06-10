import { defineField, defineType } from "sanity";

export default defineType({
	name: "department",
	title: "Department",
	type: "document",

	fields: [
		defineField({
			name: "title",
			title: "Department Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
	},
});
