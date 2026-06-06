import { PortableText } from "@portabletext/react";
import Link from "next/link";
import JobTabs from "@/app/careers/JobTabs";
import { SINGLE_JOB_QUERY } from "@/lib/integrations/sanity/queries";
import { client } from "@/lib/integrations/sanity/sanity";

export default async function JobPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const job = await client.fetch(SINGLE_JOB_QUERY, {
		slug,
	});

	if (!job) {
		return <div>Job not found</div>;
	}
	console.log(job);

	return (
		<main>
			<section className="py-24">
				<div className="container mx-auto max-w-5xl px-4">
					{/* Page Header */}
					<div className="mb-16">
						<Link
							href="/careers"
							className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition"
						>
							← Back to Careers
						</Link>
						<h1 className="text-3xl font-bold mb-4">{job.title}</h1>
					</div>

					{/* Main Grid */}
					<div className="grid lg:grid-cols-3 gap-12">
						{/* LEFT SIDEBAR */}
						<aside className="lg:sticky lg:top-24 h-fit">
							<div className="border border-[#a1a1aa] rounded-3xl p-6 space-y-6 bg-[#f4f4f5]">
								<div>
									<p className="text-sm text-gray-500 mb-1">Department</p>

									<h3 className="text-lg font-semibold capitalize">
										{job.department}
									</h3>
								</div>

								<div>
									<p className="text-sm text-gray-500 mb-1">Employment Type</p>

									<h3 className="text-lg font-semibold capitalize">
										{job.employmentType}
									</h3>
								</div>

								<div>
									<p className="text-sm text-gray-500 mb-1">Location</p>

									<h3 className="text-lg font-semibold">{job.location}</h3>
								</div>

								<div>
									<p className="text-sm text-gray-500 mb-1">Location Type</p>

									<h3 className="text-lg font-semibold capitalize">
										{job.locationType}
									</h3>
								</div>

								{job.compensation && (
									<div>
										<p className="text-sm text-gray-500 mb-1">Compensation</p>

										<h3 className="text-lg font-semibold">
											{job.compensation}
										</h3>
									</div>
								)}

								{job.experience && (
									<div>
										<p className="text-sm text-gray-500 mb-1">Experience</p>

										<h3 className="text-lg font-semibold">{job.experience}</h3>
									</div>
								)}

								{/* <button className="w-full bg-[#000] text-white rounded-full py-4 font-semibold">
                Apply Now
              </button> */}
							</div>
						</aside>

						{/* RIGHT CONTENT */}
						<div className="lg:col-span-2">
							{/* Tabs */}
							{/* <div className="flex gap-6 border-b mb-10">

              <button className="pb-4 border-b-2 border-black font-semibold">
                Overview
              </button>

              <button className="pb-4 text-gray-500">
                Application
              </button>

            </div> */}

							{/* About Content */}
							{/* <div className="prose max-w-none">

              <PortableText value={job.description} />

            </div> */}
							<JobTabs job={job} />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
