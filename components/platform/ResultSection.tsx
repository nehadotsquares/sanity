import Image from "next/image";

interface ResultSectionProps {
	data: {
		heading?: string;
		description?: string;
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
		sectionImage?: {
			asset?: {
				url?: string;
			};
		};
	};
}

export default function ResultSection({ data }: ResultSectionProps) {
	return (
		<section
			className="relative py-24 text-white overflow-x-hidden overflow-visible"
			style={{ backgroundColor: "#041117" }}
		>
			{/* LEFT BOTTOM BG */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<img
					src="/images/down_bg.avif"
					alt=""
					className="absolute bottom-0 left-0 w-[800px] opacity-100"
				/>

				<img
					src="/images/mid_bg.avif"
					alt=""
					className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] opacity-100"
				/>
			</div>
			<div className="relative z-10 mx-auto max-w-7xl px-6">
				{/* Row 1 */}
				<div className="mb-30 grid items-center gap-8 lg:grid-cols-[1fr_2fr_1fr]">
					{/* Left Image */}
					<div className="flex justify-center">
						{data?.leftImage?.asset?.url && (
							<Image
								src={data.leftImage.asset.url}
								alt="Left Image"
								width={300}
								height={300}
								className="h-auto w-full max-w-xs"
							/>
						)}
					</div>

					{/* Content */}
					<div className="text-center">
						<h2 className="mb-6 text-4xl lg:text-5xl">{data?.heading}</h2>

						<p className="text-lg">{data?.description}</p>
					</div>

					{/* Right Image */}
					<div className="flex justify-center">
						{data?.rightImage?.asset?.url && (
							<Image
								src={data.rightImage.asset.url}
								alt="Right Image"
								width={300}
								height={300}
								className="h-auto w-full max-w-xs"
							/>
						)}
					</div>
				</div>

				{/* Row 2 */}
				{data?.sectionImage?.asset?.url && (
					<div>
						<Image
							src={data.sectionImage.asset.url}
							alt="Section Image"
							width={1400}
							height={800}
							className="w-full rounded-3xl"
						/>
					</div>
				)}
			</div>
		</section>
	);
}
