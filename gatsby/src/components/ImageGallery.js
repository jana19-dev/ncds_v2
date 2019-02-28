import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import IconButton from '@material-ui/core/IconButton'
import ReactHtmlParser from 'react-html-parser'

class ImageGallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoIndex: props.startIndex,
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
    const { images, title, caption } = this.props
    const { photoIndex } = this.state

    const isSingleImage = images.length === 1

    const slideShowIcon = (
      <IconButton aria-label='Play/Pause' onClick={this.toggleSlideShow} style={{ color: 'white' }}>
        {this.state.slideShow ? <span role='img' aria-label='pause'>&#x270B;</span> : <span role='img' aria-label='play'>&#x27A4;</span> }
      </IconButton>
    )

    return (
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={!isSingleImage ? images[(photoIndex + 1) % images.length] : null}
        prevSrc={!isSingleImage ? images[(photoIndex + images.length - 1) % images.length] : null}
        onCloseRequest={this.onClose}
        onMovePrevRequest={() => this.setState({ photoIndex: (photoIndex + images.length - 1) % images.length })}
        onMoveNextRequest={() => this.setState({ photoIndex: (photoIndex + 1) % images.length })}
        toolbarButtons={!isSingleImage ? [slideShowIcon] : []}
        reactModalStyle={{ overlay: { zIndex: 1100 } }}
        imageTitle={title}
        imageCaption={ReactHtmlParser(caption)}
      />
    )
  }
}

ImageGallery.defaultProps = {
  slideTimeout: 5000,
  startIndex: 0,
  title: '',
  caption: ''
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  slideTimeout: PropTypes.number,
  startIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired
}

export default ImageGallery
