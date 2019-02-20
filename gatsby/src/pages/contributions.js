import React from 'react'
import { Layout, Contribution } from '../components'
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
          <Contribution key={node.id} contribution={node} />
        )}
      </div>
    </Layout>
  )
}

export default ContributionsPage

export const query = graphql`
  query AllContributions {
    allSanityContribution {
      edges {
        node {
          id,
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
