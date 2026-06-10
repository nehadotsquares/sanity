import Link from "next/link"
import { Resource } from "@/lib/integrations/sanity/types/resource"

const CATEGORY_LABELS: Record<
  string,
  string
> = {
  video: "Video",
  webinar: "Webinar",
  customer_stories:
    "Customer Story",
  white_paper: "White Paper",
  briefs: "Brief",
  podcast: "Podcast",
}

export function ResourceCard({
  resource,
}: {
  resource: Resource
}) { 
  const date = resource.publishDate
  ? new Date(
      resource.publishDate
    ).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }
    )
  : ""
  const slug = resource?.slug?.current;
  if (!slug) return null;
  return (
    <Link
      href={`/resources/${slug}`}
    >
      <article className="rounded-3xl border border-gray-200 px-6 py-2 transition-all duration-300 hover:border-[#bbcfea] hover:shadow-[20px_0_50px_10px_#bbcfea80]">
        {/* Row 1 */}
        <div className="flex items-center justify-between p-4 text-sm">
          <span className="rounded border border-gray-300 px-3 py-1 text-xs font-medium">
            {
              CATEGORY_LABELS[
                resource.resourceType
              ]
            }
          </span>

          <span className="uppercase">{date}</span>
        </div>

         {/* Row 2 */}
        {resource.thumbnail && (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="h-[240px] w-full object-cover"
          />
        )}

        {/* Row 3 */}
        <div className="p-4">
          <h3 className="">
            {resource.title}
          </h3>
        </div>

        {/* Row 4 */}
        {resource.speakers &&
          resource.speakers.length >
            0 && (
            <div className="border-t p-4 text-sm text-gray-600">
              {resource.speakers
                .map(
                  (
                    speaker
                  ) =>
                    speaker.name
                )
                .join(", ")}
            </div>
          )}

      </article>
    </Link>
  )
}