import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import {
  IconButton,
  Icon
} from '@material-ui/core'

class ImageGallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoIndex: 0,
      slideShow: false
    }
  }

  toggleSlideShow = () => {
    if (this.state.slideShow) {
      clearInterval(this.interval)
    } else {
      this.interval = setInterval(this.showNextSlide, this.props.slideTimeout)
    }
    this.setState({ slideShow: !this.state.slideShow })
  }

  showNextSlide = () => {
    document.getElementsByClassName('ril-next-button ril__navButtons ril__navButtonNext')[0].click()
  }

  onClose = () => {
    clearInterval(this.interval)
    this.setState({ photoIndex: 0, slideShow: false }, () => this.props.onClose())
  }

  render () {
    const { images } = this.props
    const { photoIndex } = this.state

    const slideShowIcon = (
      <IconButton aria-label='Play/Pause' onClick={this.toggleSlideShow} style={{ color: 'white' }}>
        <Icon> {this.state.slideShow ? 'pause' : 'play_arrow' } </Icon>
      </IconButton>
    )

    return (
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={this.onClose}
        onMovePrevRequest={() => this.setState({ photoIndex: (photoIndex + images.length - 1) % images.length })}
        onMoveNextRequest={() => this.setState({ photoIndex: (photoIndex + 1) % images.length })}
        toolbarButtons={[slideShowIcon]}
        reactModalStyle={{ overlay: { zIndex: 1100 } }}
      />
    )
  }
}

ImageGallery.defaultProps = {
  slideTimeout: 5000
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  slideTimeout: PropTypes.number,
  onClose: PropTypes.func.isRequired
}

export default ImageGallery
