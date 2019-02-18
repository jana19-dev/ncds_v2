import React from 'react'
import { Layout } from '../components'

import Typography from '@material-ui/core/Typography'

const GalleryPage = () => {
  return (
    <Layout title='புகைப்படங்கள்' activePage='/gallery'>
      <Typography variant='h5'>Gallery</Typography>
    </Layout>
  )
}

export default GalleryPage
