import { client } from "../sanity"

import {
  RESOURCES_QUERY,
  RESOURCE_BY_SLUG_QUERY,
  RELATED_RESOURCES_QUERY
} from "../queries"

export async function getResources() {
  return client.fetch(
    RESOURCES_QUERY
  )
}

export async function getResourceBySlug(
  slug: string
) {
  return client.fetch(
    RESOURCE_BY_SLUG_QUERY,
    { slug }
  )
}

export async function getRelatedResources(
  resourceType: string,
  slug: string
) {
  return client.fetch(
    RELATED_RESOURCES_QUERY,
    {
      resourceType,
      slug,
    }
  )
}