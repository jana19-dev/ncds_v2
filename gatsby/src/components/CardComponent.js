import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Typography,
  LinearProgress
} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { teal } from '@material-ui/core/colors'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'

const StyledCard = withStyles({
  root: {
    background: teal[700],
    height: 'fit-content',
    '&:hover': {
      backgroundColor: `${teal[900]}`
    }
  }
})(Card)

const StyledCardHeader = withStyles({
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    // fontWeight: 'bold',
    height: 25
  }
})(CardHeader)

class CardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCardExpanded: false,
      index: 0,
      completed: 10
    }
  }

  componentDidMount = () => {
    let { slideShow, content, maxSlideShow } = this.props
    if (slideShow && content.images && content.images.length > 1) {
      if (!maxSlideShow || maxSlideShow > content.images.length) maxSlideShow = content.images.length
      this.coverImageTimer = setInterval(() => {
        const completed = this.state.completed + 10
        if (completed > 100) {
          const index = (this.state.index + 1) % maxSlideShow
          this.setState({ index, completed: 10 })
        } else {
          this.setState({ completed })
        }
      }, 1000)
    }
  }

  componentWillUnmount = () => {
    const { slideShow, content } = this.props
    if (slideShow && content.images && content.images.length > 1) {
      clearInterval(this.coverImageTimer)
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ isCardExpanded: !state.isCardExpanded }))
  }

  render () {
    const {
      _id,
      title,
      name,
      date,
      description,
      image,
      images,
      startDate,
      startTime,
      endTime,
      birthDate,
      deathDate
    } = this.props.content

    const { index, completed } = this.state

    const imageURLs = images ? images.map(image => image.asset.url) : [image.asset.url]

    let slideShow = this.props.slideShow && imageURLs.length > 1
    let cardMediaImage = image ? image.asset.fixed : images[index].asset.fixed

    return (
      <StyledCard>
        <StyledCardHeader title={title || name} />
        {slideShow && <LinearProgress variant='determinate' color='secondary' value={completed} />}
        <CardActionArea onClick={() => navigate(_id, { state: { index } })}>
          <Img fixed={cardMediaImage} />
        </CardActionArea>
        <CardContent>
          {!startTime && !deathDate &&
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center' }}>
              <Typography variant='body1' style={{ color: 'white' }}>{date}</Typography>
            </div>
          }
          {(birthDate || deathDate) &&
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}>
              <Typography style={{ color: 'white' }} variant='h6'>மலர்வு</Typography>
              <Typography style={{ color: 'white' }} variant='h6'>நினைவு</Typography>
              <Typography style={{ color: 'white', fontWeight: 'bold' }} variant='body1'>{birthDate || 'Unknown'}</Typography>
              <Typography style={{ color: 'white', fontWeight: 'bold' }} variant='body1'>{deathDate}</Typography>
            </div>
          }
          {(startTime || endTime) &&
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center' }}>
              <Typography style={{ color: 'white' }} variant='h6'> {startDate} </Typography>
              <Typography style={{ color: 'white' }} variant='h6'>
                {new Date(startTime).toLocaleString('en-US', { timeZone: 'America/Toronto' }).split(', ')[1]}
                &nbsp;to&nbsp;
                {new Date(endTime).toLocaleString('en-US', { timeZone: 'America/Toronto' }).split(', ')[1]}
              </Typography>
            </div>
          }
          <Typography component='div' style={{ color: 'white', textAlign: 'center', maxHeight: 150, overflowY: 'auto' }}>
            {ReactHtmlParser(description)}
          </Typography>
        </CardContent>
      </StyledCard>
    )
  }
}

CardComponent.defaultProps = {
  slideShow: true
}

CardComponent.propTypes = {
  content: PropTypes.object.isRequired,
  slideShow: PropTypes.bool,
  maxSlideShow: PropTypes.number
}

export default CardComponent
