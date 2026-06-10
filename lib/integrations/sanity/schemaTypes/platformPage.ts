export default {
	name: "platformPage",
	title: "Platform Page",
	type: "document",
	fields: [
		{
			name: "sectionVisibility",
			type: "object",
			fields: [
				{ name: "heroSection", type: "boolean", initialValue: true },
				{ name: "featureSection", type: "boolean", initialValue: true },
				{ name: "testSection", type: "boolean", initialValue: true },
				{ name: "resultSection", type: "boolean", initialValue: true },
				{ name: "solutionSection", type: "boolean", initialValue: true },
				{ name: "singleAgentSection", type: "boolean", initialValue: true },
				{ name: "designedSection", type: "boolean", initialValue: true },
				{ name: "productionSection", type: "boolean", initialValue: true },
				{ name: "securitySection", type: "boolean", initialValue: true },
			],
		},
		{
			name: "seo",
			title: "SEO",
			type: "seo",
		},
		{
			name: "title",
			title: "Page Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
			},
		},
		{
			name: "sections",
			title: "Sections",
			type: "array",
			of: [
				{ type: "heroSection" },
				{ type: "featureSection" },
				{ type: "testSection" },
				{ type: "resultSection" },
				{ type: "solutionSection" },
				{ type: "singleAgentSection" },
				{ type: "designedSection" },
				{ type: "productionSection" },
				{ type: "securitySection" },
			],
		},
	],
};
