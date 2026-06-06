import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
	projectId: "9ufhkri8",
	dataset: "production",
	apiVersion: "2025-01-01",
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

export const writeClient = createClient({
	projectId: "9ufhkri8",
	dataset: "production",
	apiVersion: "2025-01-01",
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}
