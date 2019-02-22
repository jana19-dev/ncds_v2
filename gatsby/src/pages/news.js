import React, { Component } from 'react'
import { Layout, NewsComponent } from '../components'
import { graphql } from 'gatsby'

export default class NewsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentlyOpen: -1,
      totalItems: props.data.allFeedJvpNews.edges.length
    }
  }

  callNext = () => {
    const { currentlyOpen, totalItems } = this.state
    this.setState({ currentlyOpen: (currentlyOpen + 1) % totalItems })
  }

  callPrev = () => {
    const { currentlyOpen, totalItems } = this.state
    this.setState({ currentlyOpen: (currentlyOpen - 1) % totalItems })
  }

  openModal = currentlyOpen => this.setState({ currentlyOpen })

  closeModal = () => this.setState({ currentlyOpen: -1 })

  render () {
    const { edges: newsJVP } = this.props.data.allFeedJvpNews
    const { currentlyOpen } = this.state

    return (
      <Layout title='செய்திகள்' activePage='/news'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 275px)',
          gridGap: 20,
          justifyContent: 'center'
        }}>
          {newsJVP.map(({ node }, idx) =>
            <NewsComponent
              key={node.id}
              news={node}
              open={currentlyOpen === idx}
              idx={idx}
              callNext={this.callNext}
              callPrev={this.callPrev}
              openModal={this.openModal}
              closeModal={this.closeModal}
            />
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query AllNews {
    allFeedJvpNews(
      sort: {
        fields: [isoDate]
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          isoDate (formatString: "dddd, MMMM Do hh:mm A"),
          title,
          link,
          media {
            thumbnail {
              attrs{
                url
              }
            }
          }
        }
      }
    }
  }
`
