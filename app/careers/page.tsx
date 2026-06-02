import { client } from "@/lib/integrations/sanity/sanity";
import {
  CAREER_PAGE_QUERY,
  JOBS_QUERY,
} from "@/lib/integrations/sanity/queries";

import { PortableText } from "@portabletext/react";
import CareersList from "@/components/career/CareersList";
import Link from "next/link";

export async function generateMetadata() {
  const pageData = await client.fetch(CAREER_PAGE_QUERY);

  return {
    title:
      pageData?.seo?.metaTitle ||
      pageData?.title,

    description:
      pageData?.seo?.metaDescription,
  };
}


export default async function CareersPage() {

    const careerPage = await client.fetch(CAREER_PAGE_QUERY);
     if (!careerPage) {
        return <div>Career page not found</div>;
    }

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

            <CareersList jobs={jobs} />

            <section>
                <div className="container mx-auto max-w-3xl px-4 mb-5">{careerPage.careerText}</div>
            </section>
        </div>
    );
}