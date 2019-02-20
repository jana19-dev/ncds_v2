import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Icon,
  Typography,
  LinearProgress
} from '@material-ui/core'
import { ImageGallery } from './'
import ReactHtmlParser from 'react-html-parser'
import { teal } from '@material-ui/core/colors'
import Img from 'gatsby-image'

const StyledCardHeader = withStyles({
  title: {
    color: 'white'
  }
})(CardHeader)

class Contribution extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCardExpanded: false,
      isGalleryOpen: false,
      index: 0,
      completed: 10
    }
  }

  componentDidMount = () => {
    this.coverImageTimer = setInterval(() => {
      const completed = this.state.completed + 10
      if (completed > 100) {
        const index = (this.state.index + 1) % this.props.contribution.images.length
        this.setState({ index, completed: 10 })
      } else {
        this.setState({ completed })
      }
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.coverImageTimer)
  }

  handleExpandClick = () => {
    this.setState(state => ({ isCardExpanded: !state.isCardExpanded }))
  }

  render () {
    const {
      title,
      date,
      description
    } = this.props.contribution

    const { isCardExpanded, isGalleryOpen, index, completed } = this.state

    const ExpandIconButton = withStyles(({
      root: {
        transform: isCardExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
      }
    }))(IconButton)

    const imageURLs = this.props.contribution.images.map(image => image.asset.url)

    return (
      <Card style={{ height: 'fit-content', background: teal[800] }}>
        <StyledCardHeader title={title} />
        <LinearProgress variant='determinate' color='secondary' value={completed} />
        <CardActionArea onClick={() => this.setState({ isGalleryOpen: true })}>
          <CardMedia
            component={() => <Img fixed={this.props.contribution.images[index].asset.fixed} />}
            alt={title}
            src={imageURLs[index]}
            title={title}
          />
        </CardActionArea>
        <Collapse in={isCardExpanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography component='div' style={{ color: 'white' }}>
              {ReactHtmlParser(description)}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions style={{ display: 'grid', gridTemplateColumns: description ? '2fr 1fr' : '1fr', justifyItems: 'center', padding: 0 }}>
          <Typography variant='body1' style={{ color: 'white' }}>{date}</Typography>
          {description &&
            <ExpandIconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.isCardExpanded}
              aria-label='Show more'
            >
              <Icon>expand_more</Icon>
            </ExpandIconButton>
          }
        </CardActions>

        {isGalleryOpen && (
          <ImageGallery
            images={imageURLs}
            onClose={() => this.setState({ isGalleryOpen: false })}
            slideTimeout={5000}
            startIndex={index}
          />
        )}
      </Card>
    )
  }
}

Contribution.propTypes = {
  contribution: PropTypes.object.isRequired
}

export default Contribution
