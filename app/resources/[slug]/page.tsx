import { notFound } from "next/navigation"

import { getResourceBySlug } from "@/lib/integrations/sanity/services/resources"
import { getRelatedResources } from "@/lib/integrations/sanity/services/resources"

import { VideoTemplate } from "@/components/resources/VideoTemplate"

import { WebinarTemplate } from "@/components/resources/WebinarTemplate"

import { CustomerStoryTemplate } from "@/components/resources/CustomerStoryTemplate"

import { WhitePaperTemplate } from "@/components/resources/WhitePaperTemplate"
import { PodcastTemplate } from "@/components/resources/PodcastTemplate"
import { BriefTemplate } from "@/components/resources/BriefTemplate"

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params

  const resource =
    await getResourceBySlug(slug)

  const relatedResources =
  await getRelatedResources(
    resource.resourceType,
    slug
  )

  if (!resource)
    notFound()

  switch (
    resource.resourceType
  ) {
    case "video":
      return (
        <VideoTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    case "webinar":
      return (
        <WebinarTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    case "customer_stories":
      return (
        <CustomerStoryTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    case "white_paper":
      return (
        <WhitePaperTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    case "briefs":
      return (
        <BriefTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    case "podcast":
      return (
        <PodcastTemplate
          resource={resource}
          relatedResources={relatedResources}
        />
      )

    default:
      notFound()
  }
}