"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function CareersList({ jobs }: any) {

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locationTypeFilter, setLocationTypeFilter] = useState("");

  // Filter options
  const getFilterOptions = (jobs: any[], key: string) => {

    const counts: Record<string, number> = {};

    jobs.forEach((job) => {

      const value = job[key];

      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }

    });

    return Object.entries(counts);
  };

  const departmentOptions = getFilterOptions(jobs, "department");
  const employmentOptions = getFilterOptions(jobs, "employmentType");
  const locationOptions = getFilterOptions(jobs, "location");
  const locationTypeOptions = getFilterOptions(jobs, "locationType");

  // Filter jobs
  const filteredJobs = useMemo(() => {

    return jobs.filter((job: any) => {

      const departmentMatch =
        !departmentFilter || job.department === departmentFilter;

      const employmentMatch =
        !employmentFilter || job.employmentType === employmentFilter;

      const locationMatch =
        !locationFilter || job.location === locationFilter;

      const locationTypeMatch =
        !locationTypeFilter || job.locationType === locationTypeFilter;

      return (
        departmentMatch &&
        employmentMatch &&
        locationMatch &&
        locationTypeMatch
      );

    });

  }, [
    jobs,
    departmentFilter,
    employmentFilter,
    locationFilter,
    locationTypeFilter,
  ]);

  // Group filtered jobs
  const groupedJobs = filteredJobs.reduce(
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
    <>
      {/* Filters */}
      <section>
        <div className="container mx-auto px-4 max-w-3xl">

          <h5 className="text-2xl font-bold">
            Open Positions ({filteredJobs.length})
          </h5>

          <h5 className="text-l text-gray-600 font-bold mt-5 mb-3">
            Filters:
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Department */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize"
            >
              <option value="">Department</option>

              {departmentOptions.map(([value, count]) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>

            {/* Employment Type */}
            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize"
            >
              <option value="">Employment Type</option>

              {employmentOptions.map(([value, count]) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>

            {/* Location */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize"
            >
              <option value="">Location</option>

              {locationOptions.map(([value, count]) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>

            {/* Location Type */}
            <select
              value={locationTypeFilter}
              onChange={(e) => setLocationTypeFilter(e.target.value)}
              className="w-full border-2 border-[#a1a1aa] bg-gray-100 rounded-xl px-4 py-3 capitalize"
            >
              <option value="">Location Type</option>

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

                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {department}
                  </h2>

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
    </>
  );
}