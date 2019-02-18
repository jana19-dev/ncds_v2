import React from 'react'
import { Layout } from '../components'

import Typography from '@material-ui/core/Typography'

const EventsPage = () => {
  return (
    <Layout title='நிகழ்வுகள்' activePage='/events'>
      <Typography variant='h5'>Events</Typography>
    </Layout>
  )
}

export default EventsPage
