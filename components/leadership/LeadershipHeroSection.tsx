import Link from "next/link";
import { urlFor } from "@/lib/integrations/sanity/sanity";

type LeadershipHeroSectionProps = {
	data: {
		title?: string;
		description?: string;
		buttonText?: string;
		buttonLink?: string;
	};
};

export default function LeadershipHeroSection({
	data,
}: LeadershipHeroSectionProps) {
	return (
		<section className="relative min-h-[700px] pb-48 pt-48">
			{/* Background Image */}
			<img
				src="/images/leadership_hero_bg.webp"
				alt={data.title || ""}
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Content */}
			<div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
				<h1 className="text-4xl md:text-6xl mb-6">{data.title}</h1>

				<p className="text-md mb-8">{data.description}</p>

				{data.buttonText && data.buttonLink && (
					<Link
						href={data.buttonLink}
						className="inline-flex items-center px-8 py-4 rounded-full font-semibold bg-[#ccff00] text-black hover:bg-[#e9eef7] uppercase"
					>
						{data.buttonText}
					</Link>
				)}
			</div>
		</section>
	);
}
