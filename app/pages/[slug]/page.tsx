import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/integrations/sanity/sanity";

async function getPage(slug: string) {
	const query = `
    *[_type == "page" && slug.current == $slug][0]{
      title,
      description,
      content,
      bannerImage
    }
  `;

	return await client.fetch(query, { slug });
}

export default async function DynamicPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const page = await getPage(slug);
	const components = {
		block: {
			normal: ({ children }: any) => <p className="mb-4">{children}</p>,

			h1: ({ children }: any) => (
				<h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
			),

			h2: ({ children }: any) => (
				<h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
			),
		},

		list: {
			bullet: ({ children }: any) => (
				<ul className="list-disc pl-6 mb-4">{children}</ul>
			),

			number: ({ children }: any) => (
				<ol className="list-decimal pl-6 mb-4">{children}</ol>
			),
		},

		marks: {
			strong: ({ children }: any) => (
				<strong className="font-bold">{children}</strong>
			),

			em: ({ children }: any) => <em className="italic">{children}</em>,
		},
	};
	if (!page) {
		return <div className="p-10">Page not found</div>;
	}

	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-[350px] flex items-center justify-center">
				{/* Background Image */}
				<img
					src={urlFor(page.bannerImage).url()}
					alt={page.title}
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/60"></div>

				{/* Title */}
				<div className="relative z-10 text-center text-white">
					<h1 className="text-6xl font-bold mb-4">{page.title}</h1>

					<p className="text-xl">{page.description}</p>
				</div>
			</section>

			{/* Content */}
			<section className="max-w-4xl mx-auto px-6 py-16">
				<div className="prose max-w-none">
					<PortableText value={page.content} components={components} />
				</div>
			</section>
		</div>
	);
}
