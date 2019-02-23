import React, { Component } from 'react'
import { Layout, NewsComponent } from '../components'
import { graphql } from 'gatsby'

export default class NewsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentlyOpen: -1,
      newsItems: [
        ...props.data.allFeedJvpNews.edges,
        ...props.data.allFeedCineNews.edges,
        ...props.data.allFeedLankasriNews.edges,
        ...props.data.allFeedCanadaNews.edges
      ].sort((a, b) => new Date(b.node.pubDate) - new Date(a.node.pubDate)),
      totalItems: props.data.allFeedJvpNews.edges.length
    }
  }

  callPrev = () => {
    let { currentlyOpen } = this.state
    if (currentlyOpen === 0) currentlyOpen = -1
    else currentlyOpen -= 1
    this.setState({ currentlyOpen })
  }

  callNext= () => {
    let { currentlyOpen, totalItems } = this.state
    if (currentlyOpen === totalItems - 1) currentlyOpen = -1
    else currentlyOpen += 1
    this.setState({ currentlyOpen })
  }

  openModal = currentlyOpen => this.setState({ currentlyOpen })

  closeModal = () => this.setState({ currentlyOpen: -1 })

  render () {
    const { currentlyOpen, newsItems } = this.state

    return (
      <Layout title='செய்திகள்' activePage='/news'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 275px)',
          gridGap: 20,
          justifyContent: 'center'
        }}>
          {newsItems.map(({ node }, idx) =>
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
          pubDate,
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
    allFeedCineNews(
      sort: {
        fields: [isoDate]
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          pubDate,
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
    allFeedLankasriNews(
      sort: {
        fields: [isoDate]
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          pubDate,
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
    allFeedCanadaNews(
      sort: {
        fields: [isoDate]
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          pubDate,
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
