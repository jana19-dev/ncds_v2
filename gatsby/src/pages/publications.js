import React from 'react'
import { Layout } from '../components'

import Typography from '@material-ui/core/Typography'

const PublicationsPage = () => {
  return (
    <Layout title='வெளியீடுகள்' activePage='/publications'>
      <Typography variant='h5'>Publications</Typography>
    </Layout>
  )
}

export default PublicationsPage
