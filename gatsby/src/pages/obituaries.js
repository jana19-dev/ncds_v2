import React from 'react'
import { Layout, CardComponent } from '../components'
import { graphql } from 'gatsby'

const ObituariesPage = ({ data }) => {
  const { edges: obituaries } = data.allSanityObituary

  return (
    <Layout title='துயர்வுகள்' activePage='/obituaries'>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 375px)',
        gridGap: 20,
        justifyContent: 'center'
      }}>
        {obituaries.map(({ node }) =>
          <CardComponent key={node.id} content={node} />
        )}
      </div>
    </Layout>
  )
}

export default ObituariesPage

export const query = graphql`
  query AllObituaries {
    allSanityObituary(
      sort: {
        fields: [deathDate]
        order: DESC
      }
      filter: {
        active: {
          eq: true
        }
      }
    ) {
      edges {
        node {
          id,
          name,
          birthDate (formatString: "MMMM Do, YYYY"),
          deathDate (formatString: "MMMM Do, YYYY"),
          description,
          image {
            asset {
              url,
              fixed(height: 375) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`
