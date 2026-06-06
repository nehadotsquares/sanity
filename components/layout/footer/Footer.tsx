"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/integrations/sanity/sanity";

export default function Footer({ footer }: { footer: any }) {
	return (
		<footer className="">
			{/* TOP SECTION */}
			<div className="max-w-9xl mx-auto px-6 py-10">
				<div className="grid md:grid-cols-4 gap-10">
					{/* Logo */}
					<div>
						{footer?.logo ? (
							<Image
								src={urlFor(footer.logo).url()}
								alt="Logo"
								width={160}
								height={50}
							/>
						) : (
							<span className="text-xl font-bold">Company Name</span>
						)}
					</div>

					{/* Site Map */}
					<div>
						<h3 className="inline-block uppercase font-semibold tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea]">
							{footer?.siteMapMenu?.title}
						</h3>

						<div className="space-y-2">
							{footer?.siteMapMenu?.menuItems?.map((item: any) => (
								<Link
									key={item.link}
									href={item.link}
									className="block hover:text-gray-500"
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>

					{/* Legal */}
					<div>
						<h3 className="inline-block uppercase font-semibold tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea]">
							{footer?.legalMenu?.title}
						</h3>

						<div className="space-y-2">
							{footer?.legalMenu?.menuItems?.map((item: any) => (
								<Link
									key={item.link}
									href={item.link}
									className="block hover:text-gray-500"
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>

					{/* Connect */}
					<div>
						<h3 className="inline-block uppercase font-semibold tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea]">
							{footer?.connectMenu?.title}
						</h3>

						<div className="space-y-2">
							{footer?.connectMenu?.menuItems?.map((item: any) => (
								<Link
									key={item.link}
									href={item.link}
									className="block hover:text-gray-500"
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* BOTTOM IMAGE */}
			{footer?.footerImage && (
				<Image
					src={urlFor(footer.footerImage).url()}
					alt="Footer Image"
					width={1920}
					height={300}
					className="w-full h-auto"
				/>
			)}
		</footer>
	);
}
