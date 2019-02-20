import React from 'react'
import { Layout, CardComponent } from '../components'
import { graphql } from 'gatsby'

const PublicationsPage = ({ data }) => {
  const { edges: publications } = data.allSanityPublication

  return (
    <Layout title='வெளியீடுகள்' activePage='/publications'>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 275px)',
        gridGap: 20,
        justifyContent: 'center'
      }}>
        {publications.map(({ node }) =>
          <CardComponent key={node.id} content={node} maxSlideShow={2} />
        )}
      </div>
    </Layout>
  )
}

export default PublicationsPage

export const query = graphql`
  query AllPublications {
    allSanityPublication(
      sort: {
        fields: [date]
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          title,
          date (formatString: "MMMM YYYY"),
          description,
          images {
            asset {
              url,
              fixed(width: 280, height: 350) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`
