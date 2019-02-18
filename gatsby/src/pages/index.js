import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Image } from '../components'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Main = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-areas: "adLeft content content content content content adRight";
  @media only screen and (max-width: 768px) {
    grid-template-areas:  "content"
                          "adLeft"
                          "adRight";
  }
`

const Left = styled.div`
  grid-area: adLeft;
  `

const Middle = styled.div`
  display: grid;
  grid-template-areas:  "contentLeft contentMiddle contentMiddle contentRight";
  grid-area: content;
  align-items: center;
  margin: 0 20px;
  @media only screen and (max-width: 768px) {
    grid-template-areas:  "contentMiddle"
                          "contentLeft"
                          "contentRight";
  }
`

const Right = styled.div`
  grid-area: adRight;
`

const Advertisement = styled.div`
  margin-bottom: 10px;
`

const IndexPage = ({ data }) => {
  const advertisements = data.allSanityHome.edges[0].node.images
  const nainativu = data.allSanityHome.edges[1].node.images

  return (
    <Layout title='நயினாதீவு' activePage='/'>
      <Main>
        <Left>
          <Advertisement><Img fluid={advertisements[0].asset.fluid} /></Advertisement>
          <Advertisement><Img fluid={advertisements[1].asset.fluid} /></Advertisement>
        </Left>
        <Middle>
          <div style={{ gridArea: 'contentLeft' }}>
            <Img fluid={nainativu[0].asset.fluid} />
            <Img fluid={nainativu[1].asset.fluid} />
            <Img fluid={nainativu[2].asset.fluid} />
            <Img fluid={nainativu[3].asset.fluid} />
          </div>
          <div style={{ gridArea: 'contentMiddle' }}>
            <Image src='anthem.png' />
          </div>
          <div style={{ gridArea: 'contentRight' }}>
            <Img fluid={nainativu[4].asset.fluid} />
            <Img fluid={nainativu[5].asset.fluid} />
            <Img fluid={nainativu[6].asset.fluid} />
            <Img fluid={nainativu[7].asset.fluid} />
          </div>
        </Middle>
        <Right>
          <Advertisement><Img fluid={advertisements[2].asset.fluid} /></Advertisement>
          <Advertisement><Img fluid={advertisements[3].asset.fluid} /></Advertisement>
        </Right>
      </Main>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query AllHomeImages {
    allSanityHome {
      edges {
        node {
          name
          images {
            asset {
              fluid(maxWidth: 250) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`
