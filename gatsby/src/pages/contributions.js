import React from 'react'
import { Layout, CardComponent } from '../components'
import { graphql } from 'gatsby'

const ContributionsPage = ({ data }) => {
  const { edges: contributions } = data.allSanityContribution

  return (
    <Layout title='அபிவிருத்திகள்' activePage='/contributions'>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 375px)',
        gridGap: 20,
        justifyContent: 'center'
      }}>
        {contributions.map(({ node }) =>
          <CardComponent key={node._id} content={node} />
        )}
      </div>
    </Layout>
  )
}

export default ContributionsPage

export const query = graphql`
  query AllContributions {
    allSanityContribution(
      sort: {
        fields: [date]
        order: DESC
      }
    ) {
      edges {
        node {
          _id,
          slug {
            current
          },
          title,
          date (formatString: "MMMM Do, YYYY"),
          description,
          images {
            asset {
              url,
              fixed(height: 250) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`
