import Link from "next/link";
import { ResourceCard } from "./ResourceCard"
import { PortableTextRenderer } from "@/components/resources/PortableTextRenderer"

export function WhitePaperTemplate({
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

  const handleDownload = async () => {
    const res = await fetch(resource.pdf.asset.url)
    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

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

        {resource.content && (
          <div className="">
              <PortableTextRenderer
                value={resource.content}
              />
          </div>
        )}

        {resource.pdf?.asset?.url && (
          <div className="mt-8 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                PDF Document
              </h3>

              <div className="flex gap-4">
                <a
                  href={resource.pdf.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Open Full View
                </a>
              </div>
            </div>

            {/* Viewer */}
            <iframe
              style={{ height: "600px", width: "100%" }}
              src={resource.pdf.asset.url}
              className="border rounded"
              title="PDF Viewer"
            />
          </div>
        )}

        {resource.speakers?.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-lg font-semibold">
              Speakers
            </h3>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resource.speakers.map((speaker: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded border p-4"
                >
                  {/* IMAGE */}
                  {speaker.image && (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-10 w-10 rounded object-cover flex-shrink-0"
                    />
                  )}

                  {/* TEXT */}
                  <div className="flex flex-col">
                    <div className="font-medium">
                      {speaker.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {speaker.designation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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