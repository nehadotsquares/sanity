import Image from "next/image";

interface FeatureSectionProps {
	data: {
		heading?: string;
		description?: string;
		icon?: {
			asset?: {
				url?: string;
			};
		};
		image?: {
			asset?: {
				url?: string;
			};
		};
	};
}

export default function FeatureSection({ data }: FeatureSectionProps) {
	return (
		<section
			className="relative py-20 text-white overflow-hidden"
			style={{ backgroundColor: "#041117" }}
		>
			<img
				src="/images/up_bg.avif"
				alt=""
				className="pointer-events-none absolute top-0 left-0 w-[800px] opacity-100"
			/>
			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					{/* Left Column - Image */}
					<div>
						{data?.image?.asset?.url && (
							<Image
								src={data.image.asset.url}
								alt={data.heading || "Feature Image"}
								width={700}
								height={500}
								className="h-auto w-full rounded-2xl"
							/>
						)}
					</div>

					{/* Right Column */}
					<div>
						{data?.icon?.asset?.url && (
							<Image
								src={data.icon.asset.url}
								alt="Feature Icon"
								width={60}
								height={60}
								className="mb-6"
							/>
						)}

						<h2 className="mb-4 text-4xl">{data?.heading}</h2>

						<p className="text-lg">{data?.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
