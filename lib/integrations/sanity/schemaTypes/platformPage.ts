export default {
	name: "platformPage",
	title: "Platform Page",
	type: "document",
	fields: [
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
