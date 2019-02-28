import React from 'react'
import { Layout, ImageGallery } from '../components'
import { navigate } from 'gatsby'

const GalleryDetails = ({ pageContext, location }) => {
  const { index = 0 } = location.state

  const {
    title,
    name,
    image,
    images,
    description = '',
    onClosePath
  } = pageContext

  const imageURLs = images ? images.map(image => image.asset.url) : image ? [image.asset.url] : []

  return (
    <Layout title={title || name} activePage={onClosePath}>
      <ImageGallery
        images={imageURLs}
        onClose={() => navigate(onClosePath)}
        slideTimeout={5000}
        startIndex={index}
        title={title || name}
        caption={description}
      />
    </Layout>
  )
}

export default GalleryDetails
