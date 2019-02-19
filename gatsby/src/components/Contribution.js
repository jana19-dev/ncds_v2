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
  Typography
} from '@material-ui/core'
import { ImageGallery } from './'
import ReactHtmlParser from 'react-html-parser'
import { teal } from '@material-ui/core/colors'

class Contribution extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCardExpanded: false,
      isGalleryOpen: false
    }
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

    const { isCardExpanded, isGalleryOpen } = this.state

    const ExpandIconButton = withStyles(({
      root: {
        transform: isCardExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
      }
    }))(IconButton)

    const images = this.props.contribution.images.map(image => image.asset.url)

    return (
      <Card style={{ height: 'fit-content', background: teal[800] }}>
        <CardHeader title={title} />
        <CardActionArea onClick={() => this.setState({ isGalleryOpen: true })}>
          <CardMedia
            component='img'
            alt={title}
            height='200'
            image={images[0]}
            title={title}
          />
        </CardActionArea>
        <Collapse in={isCardExpanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography component='div'>
              {ReactHtmlParser(description)}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions style={{ display: 'grid', gridTemplateColumns: description ? '2fr 1fr' : '1fr', justifyItems: 'center', padding: 0 }}>
          <Typography variant='body1'>{date}</Typography>
          {description &&
            <ExpandIconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.isCardExpanded}
              aria-label='Show more'
            >
              <Icon> expand_more </Icon>
            </ExpandIconButton>
          }
        </CardActions>

        {isGalleryOpen && (
          <ImageGallery
            images={images}
            onClose={() => this.setState({ isGalleryOpen: false })}
            slideTimeout={5000}
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
