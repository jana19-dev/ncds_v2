import React, { Component } from 'react'
import { Layout, CardComponent } from '../components'
import { graphql } from 'gatsby'
import { Chip } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export default class EventsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeFilter: 'Upcoming Events'
    }
  }

  canShow = (eventDate) => {
    const { activeFilter } = this.state
    if (activeFilter !== 'Show All') {
      if ((activeFilter === 'Upcoming Events') && new Date(eventDate).getDate() < new Date().getDate()) return false
      if ((activeFilter === 'Past Events') && new Date(eventDate).getDate() >= new Date().getDate()) return false
    }
    return true
  }

  render () {
    const { edges: events } = this.props.data.allSanityEvent
    const { activeFilter } = this.state

    return (
      <Layout title='நிகழ்வுகள்' activePage='/events'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 150px)',
          gridGap: 10,
          marginBottom: 20,
          justifyContent: 'center'
        }}>
          {['Upcoming Events', 'Past Events', 'Show All'].map((type, idx) =>
            <Chip
              key={idx}
              label={type}
              clickable
              onClick={() => this.setState({ activeFilter: type })}
              style={activeFilter === type ? {
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
          {events.filter(({ node }) => this.canShow(node.endDate)).map(({ node }) =>
            <CardComponent key={node._id} content={node} />
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query AllEvents {
    allSanityEvent(
      sort: {
        fields: [startTime]
        order: ASC
      }
    ) {
      edges {
        node {
          _id,
          slug {
            current
          },
          title,
          endDate: endTime,
          startDate: startTime (formatString: "dddd, MMMM Do YYYY"),
          startTime,
          endTime,
          description,
          image {
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
  }
`
