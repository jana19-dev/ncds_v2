module.exports = {
  siteMetadata: {
    title: `Nainativu CDS`,
    description: `Nainativu Canadian Development Society`,
    author: `Jana Rajakumar`,
    siteUrl: `https://nainativucds.org`
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '8crwkfsj',
        dataset: 'production',
        token: process.env.GATSBY_SANITY_TOKEN,
        watchMode: true
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://www.jvpnews.com/rss.xml`,
        name: `JvpNews`,
        parserOption: {
          customFields: {
            item: ['media:thumbnail']
          }
        }
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://www.cineulagam.com/rss.xml`,
        name: `CineNews`,
        parserOption: {
          customFields: {
            item: ['media:thumbnail']
          }
        }
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://news.lankasri.com/rss.xml`,
        name: `LankasriNews`,
        parserOption: {
          customFields: {
            item: ['media:thumbnail']
          }
        }
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://www.canadamirror.com/rss.xml`,
        name: `CanadaNews`,
        parserOption: {
          customFields: {
            item: ['media:thumbnail']
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ncds`,
        short_name: `ncds`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    }
  ]
}
