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
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '8crwkfsj',
        dataset: 'production',
        token: process.env.GATSBY_SANITY_TOKEN,
        watchMode: true
      }
    }
    // 'gatsby-plugin-offline',
  ]
}
