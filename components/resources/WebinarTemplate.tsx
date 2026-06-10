import { ResourceForm } from "@/components/resources/ResourceForm"
import { PortableTextRenderer } from "@/components/resources/PortableTextRenderer"
import Link from "next/link";
import { ResourceCard } from "./ResourceCard"

export function WebinarTemplate({
  resource,
  relatedResources,
}: any) {
  const date = resource.publishDate
    ? new Date(resource.publishDate).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }
      )
    : ""
      console.log(resource);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/resources">Resources /</Link>

          <span className="mx-2 capitalize">{resource.resourceType} /</span>

          <span>{resource.title}</span>
        </nav>

        {/* Category & Date */}
        <div className="mb-4">
          <span className="rounded border border-gray-300 px-3 py-1 text-xs font-medium capitalize">
           {resource.resourceType} 
          </span>

          <span className="px-3">{date}</span>
        </div>

        {/* Title */}
        <h1 className="mb-10 mt-8 text-4xl">
          {resource.title}
        </h1>

        {/* Content Layout */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }} className="grid grid-cols-12 gap-10 items-start mb-10">

          {/* LEFT */}
          <div className="col-span-6 min-w-0">

            {resource.content && (
              <div className="">
                <div>
                  <PortableTextRenderer
                    value={resource.content}
                  />
                </div>
              </div>
            )}

            {resource.speakers?.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Speakers
                </h3>

                <div className="space-y-4">
                  {resource.speakers.map(
                    (speaker: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4"
                      >
                        {speaker.image && (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        )}

                        <div>
                          <div className="font-medium">
                            {speaker.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {speaker.designation}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="col-span-6">
            <div className="sticky top-24">
              <ResourceForm
                heading={resource.formHeading}
              />
            </div>
          </div>

        </div>
        
        

        {/* Related Resource */}
        {relatedResources &&
          relatedResources.length > 0 && (
            <>
              {/* Related Resources Heading */}
              <h2 className="mb-8 text-4xl">
                Related Resources
              </h2>

              {/* Related Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedResources.map(
                  (resource: any) => (
                    <ResourceCard
                      key={resource._id}
                      resource={resource}
                    />
                  )
                )}
              </div>
            </>
        )}
      </div>
    </section>
  )
}