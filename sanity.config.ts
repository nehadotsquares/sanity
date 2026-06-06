import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
	name: "default",
	title: "sanity-blog",

	projectId: "9ufhkri8",
	dataset: "production",

	plugins: [
		structureTool({
			// structure,
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
});
