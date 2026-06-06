import Image from "next/image";

interface SingleAgentSectionProps {
	data: {
		heading?: string;
		description?: string;
		image?: {
			asset?: {
				url?: string;
			};
		};
	};
}

export default function SingleAgentSection({ data }: SingleAgentSectionProps) {
	return (
		<section className="py-24">
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					{/* Content */}
					<div>
						<h2 className="mb-6 text-4xl lg:text-5xl">{data?.heading}</h2>

						<p className="text-lg text-gray-600">{data?.description}</p>
					</div>

					{/* Image */}
					<div>
						{data?.image?.asset?.url && (
							<Image
								src={data.image.asset.url}
								alt={data.heading || "Single Agent"}
								width={800}
								height={600}
								className="h-auto w-full"
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
