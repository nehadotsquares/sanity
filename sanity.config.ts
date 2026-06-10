import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./lib/integrations/sanity/schemaTypes";
import { structure } from "./lib/integrations/sanity/structure";

export default defineConfig({
	// name: "default",
	// title: "sanity-blog",

	// projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
	// dataset: "production",

	// plugins: [
	// 	structureTool({
	// 		// structure,
	// 	}),
	// 	visionTool(),
	// ],

	// schema: {
	// 	types: schemaTypes,
	// },
	name: "production",
    title: "Production",
    basePath: "/studio/production",
    projectId : "9ufhkri8",
    dataset: "production" as const,
    schema: {
		types: schemaTypes,
	},
    plugins: [
		structureTool({
			// structure,
		}),
		visionTool(),
	],
    // auth: getAuthStore("production"),
});
