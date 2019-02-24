import React from 'react'
import { graphql } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import {
  Layout,
  Image
} from '../components'
import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'
import Img from 'gatsby-image'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import { teal } from '@material-ui/core/colors'

const Main = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 260px 1fr 2fr 1fr 260px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Advertisement = styled.div`
  margin-bottom: 20px;
`

const StyledCardHeader = withStyles({
  root: {
    background: teal[800]
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
})(CardHeader)

export default class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      isMobile: false
    }
  }

  componentDidMount = () => {
    const isMobile = window.innerWidth < 768
    this.setState({ isMobile })
  }

  render () {
    const advertisements = this.props.data.allSanityHome.edges[0].node.images
    const nainativu = this.props.data.allSanityHome.edges[1].node.images
    const announcements = this.props.data.allSanityInfo.edges.find(info => info.node.name === 'annoucements').node

    const { isMobile } = this.state

    const leftAds = (
      <div>
        <Advertisement><Img fluid={advertisements[0].asset.fluid} /></Advertisement>
        <Advertisement><Img fluid={advertisements[1].asset.fluid} /></Advertisement>
      </div>
    )

    const rightAds = (
      <div>
        <Advertisement><Img fluid={advertisements[2].asset.fluid} /></Advertisement>
        <Advertisement><Img fluid={advertisements[3].asset.fluid} /></Advertisement>
      </div>
    )

    const leftPics = (
      <div style={{ display: 'grid', gridGap: 5 }}>
        <Img fluid={nainativu[0].asset.fluid} />
        <Img fluid={nainativu[1].asset.fluid} />
        <Img fluid={nainativu[2].asset.fluid} />
        <Img fluid={nainativu[3].asset.fluid} />
      </div>
    )

    const rightPics = (
      <div style={{ display: 'grid', gridGap: 5 }}>
        <Img fluid={nainativu[4].asset.fluid} />
        <Img fluid={nainativu[5].asset.fluid} />
        <Img fluid={nainativu[6].asset.fluid} />
        <Img fluid={nainativu[7].asset.fluid} />
      </div>
    )

    const middlePics = (
      <div>
        {announcements.description &&
          <Card style={{ marginBottom: 10 }}>
            <StyledCardHeader title='Latest Annoucements' />
            <CardContent style={{ maxHeight: 150, overflowY: 'auto' }}>
              <Typography component='div'>
                {ReactHtmlParser(announcements.description)}
              </Typography>
            </CardContent>
          </Card>
        }
        <Image src='anthem.png' />
      </div>
    )

    return (
      <Layout title='நயினாதீவு' activePage='/'>
        <Main>
          {!isMobile
            ? <>
              {leftAds}
              {leftPics}
              {middlePics}
              {rightPics}
              {rightAds}
            </>
            : <>
              {middlePics}
              {leftPics}
              {rightPics}
              {leftAds}
              {rightAds}
            </>
          }
        </Main>
      </Layout>
    )
  }
}

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
    allSanityInfo {
      edges {
        node {
          name,
          description
        }
      }
    }
  }
`
