import React from 'react'
import { Layout } from '../components'

import Typography from '@material-ui/core/Typography'

const NewsPage = () => {
  return (
    <Layout title='செய்திகள்' activePage='/news'>
      <Typography variant='h5'>News</Typography>
    </Layout>
  )
}

export default NewsPage
