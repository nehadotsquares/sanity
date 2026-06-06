import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
	data: {
		heading?: string;
		description?: string;
		buttonTitle?: string;
		buttonLink?: string;
		leftImage?: {
			asset?: {
				url?: string;
			};
		};
		rightImage?: {
			asset?: {
				url?: string;
			};
		};
	};
}

export default function HeroSection({ data }: HeroSectionProps) {
	return (
		<section className="w-full py-20">
			<div className="grid items-center gap-8 lg:grid-cols-[1fr_2fr_1fr]">
				{/* Left Image */}
				<div className="flex justify-center">
					{data?.leftImage?.asset?.url && (
						<Image
							src={data.leftImage.asset.url}
							alt="Left Hero Image"
							width={500}
							height={700}
							className="h-auto w-full"
						/>
					)}
				</div>

				{/* Content */}
				<div className="px-6 text-center">
					<h1 className="text-5xl lg:text-5xl">{data?.heading}</h1>

					<p className="mx-auto mt-6 max-w-2xl text-lg">{data?.description}</p>

					{data?.buttonTitle && data?.buttonLink && (
						<Link
							href={data.buttonLink}
							className="mt-8 inline-flex rounded-full bg-[#ccff00] hover:bg-[#e9eef7] px-4 py-2 font-medium uppercase"
						>
							{data.buttonTitle}
						</Link>
					)}
				</div>

				{/* Right Image */}
				<div className="flex justify-center">
					{data?.rightImage?.asset?.url && (
						<Image
							src={data.rightImage.asset.url}
							alt="Right Hero Image"
							width={500}
							height={700}
							className="h-auto w-full"
						/>
					)}
				</div>
			</div>
		</section>
	);
}
