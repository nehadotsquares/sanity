export const PLATFORM_PAGE_QUERY = `
*[_type == "platformPage"][0]{
  title,
  seo{
    metaTitle,
    metaDescription,
    ogImage
  },
  sections[]{
    ...,

    leftImage{
      asset->{
        url
      }
    },

    rightImage{
      asset->{
        url
      }
    },

    sectionImage{
      asset->{
        url
      }
    },

    image{
      asset->{
        url
      }
    },

    icon{
      asset->{
        url
      }
    },

    cards[]{
      ...,
      iconImage{
        asset->{
          url
        }
      },
      image{
        asset->{
          url
        }
      }
    }
  }
}
`;

export const CAREER_PAGE_QUERY = `
  *[_type == "careerPage"][0]{
    title,
    description,
    careerText,
    seo{
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const JOBS_QUERY = `
  *[_type == "job"] | order(_createdAt desc){
    _id,
    title,
    slug,
    "department": department->title,
    employmentType,
    location,
    locationType
  }
`;

export const SINGLE_JOB_QUERY = `
  *[_type == "job" && slug.current == $slug][0]{
    title,
    slug,
    "department": department->title,
    employmentType,
    location,
    locationType,
    compensation,
    description
  }
`;

export const LEADERSHIP_PAGE_QUERY = `
*[_type == "leadershipPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    ogImage
  },

  sections[]
}
`;

export const PENTEST_PAGE_QUERY = `
  *[_type == "pentestPage"][0]{
    seo{
      metaTitle,
      metaDescription,
      ogImage
    },
    sections[]
  }
`;

export const RESOURCES_QUERY  = `
  *[_type == "resource"] | order(publishDate desc){
    _id,
    title,
    slug,
    resourceType,
    publishDate,

    "thumbnail": thumbnail.asset->url,

    content,

    speakers[]{
      name,
      designation,
      "image": image.asset->url
    }
  }
`;

export const RESOURCE_BY_SLUG_QUERY = `
*[
  _type == "resource"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  resourceType,

  "thumbnail": thumbnail.asset->url,

  content,

  videoUrl,
  
  podcastUrl,

  publishDate,

  webinarDate,

  formHeading,

  clientName,

  pdf {
    asset -> {
      url
    }
  },
  
  speakers[]{
    name,
    designation,
    "image": image.asset->url
  }
}
`;

export const RELATED_RESOURCES_QUERY = `
*[
  _type == "resource" &&
  resourceType == $resourceType &&
  slug.current != $slug
] | order(publishDate desc)[0...3]{
  _id,
  title,
  slug,
  resourceType,
  publishDate,

  "thumbnail": thumbnail.asset->url,

  speakers[]{
    name,
    designation,
    "image": image.asset->url
  }
}
`;