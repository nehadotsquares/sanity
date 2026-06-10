import Link from "next/link";
import { ResourceCard } from "./ResourceCard"
import { PortableTextRenderer } from "@/components/resources/PortableTextRenderer"
import { createSlug } from "@/components/resources/PortableTextRenderer"

export function CustomerStoryTemplate({
  resource,
  relatedResources
}: any ) {
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
  const headings =
  resource.content
    ?.filter((block: any) => block.style === "h2")
    .map((block: any) => {
      const text = block.children
        ?.map((c: any) => c.text)
        .join("")

      return {
        text,
        id: createSlug(text),
      }
    }) || []

  console.log(resource);
  return (
     <section className="py-16">
      <div className="container mx-auto mt-[100px] max-w-7xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/resources">Resources /</Link>

          <span className="mx-2 capitalize">{resource.resourceType} /</span>

          <span>{resource.title}</span>
        </nav>

        {/* Category & Date */}
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="rounded border border-gray-300 px-3 py-1 text-xs font-medium capitalize">
           {resource.resourceType} 
          </span>

          <span>{date}</span>
        </div>

        {/* Title */}
        <h1 className="mb-8 mt-8 text-4xl">
          {resource.title}
        </h1>

       <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }} className="grid grid-cols-12 gap-10 items-start mb-10">
          {resource.content && (
            <>
            {/* LEFT */}
            <div className="lg:block lg:col-span-9">
                <PortableTextRenderer
                  value={resource.content}
                />
            </div>
            <div className="lg:block lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="mb-4 font-semibold">
                  On This Page
                </h3>

                <ul className="space-y-2">
                  {headings.map((heading: any) => (
                    <li
                      key={heading.id}
                      className={
                        heading.level === "h2"
                          ? "ml-4"
                          : ""
                      }
                    >
                      <a
                        href={`#${heading.id}`}
                        className="text-sm text-gray-600 hover:text-black"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
          )}
       </div>

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