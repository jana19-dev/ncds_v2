import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

function renderImage (images, src, width) {
  let file = images.edges.find(image => image.node.relativePath === src)
  if (file) {
    return <div style={{ width, margin: '0 auto' }}><Img fluid={file.node.childImageSharp.fluid} /></div>
  } else {
    file = images.edges.find(image => image.node.relativePath === 'unknown.jpg')
    return <div style={{ width, margin: '0 auto' }}><Img fluid={file.node.childImageSharp.fluid} /></div>
  }
}

const Image = ({ src, width }) => {
  return <StaticQuery
    query={graphql`
      query {
        images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
          edges {
            node {
              extension
              relativePath
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={({ images }) => renderImage(images, src, width)}
  />
}

Image.defaultProps = {
  src: `unknown.jpg`,
  width: '100%'
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string
}

export default Image
