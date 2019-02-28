exports.createPages = ({ graphql, boundActionCreators }) => {
  const path = require(`path`)
  const { createPage } = boundActionCreators
  const galleryDetailsTemplate = path.resolve(`src/templates/gallery.js`)

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allSanityContribution {
            edges {
              node {
                _id,
                title,
                description,
                images {
                  asset {
                    url
                  }
                }
              }
            }
          }
          allSanityPublication {
            edges {
              node {
                _id,
                title,
                description,
                images {
                  asset {
                    url
                  }
                }
              }
            }
          }
          allSanityGallery {
            edges {
              node {
                _id,
                title,
                description,
                images {
                  asset {
                    url
                  }
                }
              }
            }
          }
          allSanityEvent {
            edges {
              node {
                _id,
                title,
                description,
                image {
                  asset {
                    url
                  }
                }
              }
            }
          }
          allSanityObituary {
            edges {
              node {
                _id,
                name,
                description,
                image {
                  asset {
                    url
                  }
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) reject(result.errors)
        result.data.allSanityContribution.edges.forEach(({ node }) => {
          createPage({
            path: `${node._id}`,
            component: galleryDetailsTemplate,
            context: {
              ...node,
              onClosePath: '/contributions'
            }
          })
        })
        result.data.allSanityPublication.edges.forEach(({ node }) => {
          createPage({
            path: `${node._id}`,
            component: galleryDetailsTemplate,
            context: {
              ...node,
              onClosePath: '/publications'
            }
          })
        })
        result.data.allSanityGallery.edges.forEach(({ node }) => {
          createPage({
            path: `${node._id}`,
            component: galleryDetailsTemplate,
            context: {
              ...node,
              onClosePath: '/gallery'
            }
          })
        })
        result.data.allSanityEvent.edges.forEach(({ node }) => {
          createPage({
            path: `${node._id}`,
            component: galleryDetailsTemplate,
            context: {
              ...node,
              onClosePath: '/events'
            }
          })
        })
        result.data.allSanityObituary.edges.forEach(({ node }) => {
          createPage({
            path: `${node._id}`,
            component: galleryDetailsTemplate,
            context: {
              ...node,
              onClosePath: '/obituaries'
            }
          })
        })
      })
    )
  })
}
