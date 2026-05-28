import { client } from "@/lib/integrations/sanity/sanity";
import {
  CAREER_PAGE_QUERY,
  JOBS_QUERY,
} from "@/lib/integrations/sanity/queries";

import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function CareersPage() {

    const careerPage = await client.fetch(CAREER_PAGE_QUERY);

    const jobs = await client.fetch(JOBS_QUERY);

    const getFilterOptions = (
        jobs: any[],
        key: string
        ) => {

        const counts: Record<string, number> = {};

        jobs.forEach((job) => {
            const value = job[key];

            if (value) {
            counts[value] = (counts[value] || 0) + 1;
            }
        });

        return Object.entries(counts);
    };

    const departmentOptions = getFilterOptions(
        jobs,
        "department"
        );

    const employmentOptions = getFilterOptions(
        jobs,
        "employmentType"
        );

    const locationOptions = getFilterOptions(
        jobs,
        "location"
        );

    const locationTypeOptions = getFilterOptions(
        jobs,
        "locationType"
        );

    const groupedJobs = jobs.reduce(
        (acc: any, job: any) => {

            const department = job.department || "Other";

            if (!acc[department]) {
            acc[department] = [];
            }

            acc[department].push(job);

            return acc;
        },
        {}
        );    

    if (!careerPage) {
        return <div>Career page not found</div>;
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="py-15">
                <div className="container mx-auto px-4 max-w-3xl">


                <div className="prose max-w-none">
                    <PortableText value={careerPage.description} />
                </div>
                
                </div>
            </section>

            {/* Filters */}
            <section className="">
                <div className="container mx-auto px-4 max-w-3xl">
                <h5 className="text-2xl font-bold">
                    Open Positions ({jobs.length})
                </h5>
                <h5 className="text-l text-gray-600 font-bold mt-5 mb-3">
                    Filters:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <select className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize">

                        <option>
                            Department
                        </option>

                        {departmentOptions.map(([value, count]) => (
                            <option key={value} value={value}>
                            {value} ({count})
                            </option>
                        ))}

                    </select>

                    <select className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize">
                        <option>
                            Employment Type
                        </option>

                        {employmentOptions.map(([value, count]) => (
                            <option key={value} value={value}>
                            {value} ({count})
                            </option>
                        ))}
                    </select>

                    <select className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize">
                        <option>
                            Location
                        </option>

                        {locationOptions.map(([value, count]) => (
                            <option key={value} value={value}>
                            {value} ({count})
                            </option>
                        ))}
                    </select>

                    <select className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize">
                        <option>
                            Location Type
                        </option>

                        {locationTypeOptions.map(([value, count]) => (
                            <option key={value} value={value}>
                            {value} ({count})
                            </option>
                        ))}
                    </select>

                </div>

                </div>
            </section>

            {/* Jobs */}
            <section className="py-10">
                <div className="container mx-auto max-w-3xl px-4">

                <div className="space-y-4">
                    {Object.entries(groupedJobs).map(
                        ([department, departmentJobs]: any) => (

                        <div key={department}>

                            {/* Department Title */}
                            <h2 className="text-xl font-semibold mb-2 capitalize">
                            {department}
                            </h2>

                            {/* Jobs */}
                            <div className="space-y-4">

                            {departmentJobs.map((job: any) => (

                                <Link
                                key={job._id}
                                href={`/careers/${job.slug.current}`}
                                className="bg-gray-100 rounded-l p-6 mb-2 flex justify-between items-center hover:bg-gray-200 transition"
                                >

                                <div>
                                    <h3 className="text-xl font-semibold">
                                    {job.title}
                                    </h3>

                                    <p className="text-gray-600 mt-2 capitalize">
                                    {job.department} • {job.location} • {job.employmentType} • {job.locationType}
                                    </p>
                                </div>
                                </Link>

                            ))}

                            </div>

                        </div>
                        )
                    )}
                </div>

                </div>
            </section>

            <section>
                <div className="container mx-auto max-w-3xl px-4 mb-5">We believe in people who are driven by curiosity and a willingness to learn. Even if you don't check every box, we encourage you to apply if you're excited about the role and our mission.</div>
            </section>
        </div>
    );
}