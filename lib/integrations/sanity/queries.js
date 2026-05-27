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