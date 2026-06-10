export interface Speaker {
  name: string
  designation?: string
  image?: string
}

export interface Resource {
  _id: string
  title: string

  slug: {
    current: string
  }

  resourceType:
    | "video"
    | "webinar"
    | "customer_stories"
    | "white_paper"
    | "briefs"
    | "podcasts"
  publishDate: string
  thumbnail?: string
  speakers?: Speaker[]
}