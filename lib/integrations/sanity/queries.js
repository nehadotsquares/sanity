export const PLATFORM_PAGE_QUERY = `
*[_type == "platformPage"][0]{
  title,
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
    description
  }
`;

export const JOBS_QUERY = `
  *[_type == "job"] | order(_createdAt desc){
    _id,
    title,
    slug,
    department,
    employmentType,
    location,
    locationType
  }
`;

export const SINGLE_JOB_QUERY = `
  *[_type == "job" && slug.current == $slug][0]{
    title,
    slug,
    department,
    employmentType,
    location,
    locationType,
    compensation,
    description
  }
`;