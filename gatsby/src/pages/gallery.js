import React, { Component } from 'react'
import { Layout, CardComponent } from '../components'
import { graphql } from 'gatsby'
import { Chip } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export default class GalleryPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeFilter: 'Show All'
    }
  }

  canShow = (galleryDate) => {
    const { activeFilter } = this.state
    if (activeFilter !== 'Show All') {
      if ((activeFilter === 'Upcoming Gallerys') && new Date(galleryDate).getDate() < new Date().getDate()) return false
      if ((activeFilter === 'Past Gallerys') && new Date(galleryDate).getDate() >= new Date().getDate()) return false
    }
    return true
  }

  render () {
    const { edges: galleries } = this.props.data.allSanityGallery
    let { edges: tags } = this.props.data.allSanityGalleryTag
    tags = [{ node: { _id: 'showAll', name: 'Show All' } }, ...tags]
    const { activeFilter } = this.state

    return (
      <Layout title='புகைப்படங்கள்' activePage='/gallery'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 150px)',
          gridGap: 10,
          marginBottom: 20,
          justifyContent: 'center'
        }}>
          {tags.map(({ node }) =>
            <Chip
              key={node._id}
              label={node.name}
              clickable
              onClick={() => this.setState({ activeFilter: node.name })}
              style={activeFilter === node.name ? {
                background: teal[800],
                color: 'white'
              } : {
              }}
            />
          )}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 375px)',
          gridGap: 20,
          justifyContent: 'center'
        }}>
          {galleries
            .filter(({ node }) =>
              activeFilter === 'Show All' || node.tags.map(tag => tag.name)
                .includes(activeFilter)
            )
            .map(({ node }) =>
              <CardComponent key={node._id} content={node} />
            )
          }
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query AllGallerys {
    allSanityGallery(
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
          tags {
            name
          },
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
    allSanityGalleryTag (
      sort: {
          fields: [name]
          order: ASC
        }
    ) {
      edges {
        node {
          _id,
          name
        }
      }
    }
  }
`
