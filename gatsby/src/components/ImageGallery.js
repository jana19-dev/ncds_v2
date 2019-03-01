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
      slideShow: false,
      timer: props.slideTimeout / 1000
    }
  }

  toggleSlideShow = () => {
    if (this.state.slideShow) {
      clearInterval(this.interval)
      clearInterval(this.timer)
      this.setState({ slideShow: !this.state.slideShow, timer: this.props.slideTimeout / 1000 })
    } else {
      this.interval = setInterval(this.showNextSlide, this.props.slideTimeout)
      this.timer = setInterval(() => {
        this.setState({ timer: this.state.timer - 1 })
      }, 1000)
    }
    this.setState({ slideShow: !this.state.slideShow })
  }

  showNextSlide = () => {
    this.setState({ timer: (this.props.slideTimeout / 1000) + 1 }, () => {
      document.getElementsByClassName('ril-next-button ril__navButtons ril__navButtonNext')[0].click()
    })
  }

  onClose = () => {
    clearInterval(this.interval)
    clearInterval(this.timer)
    this.setState({ photoIndex: 0, slideShow: false, timer: this.props.slideTimeout / 1000 }, () => this.props.onClose())
  }

  render () {
    const { images, title, caption } = this.props
    const { photoIndex, timer } = this.state

    const isSingleImage = images.length === 1

    const slideShowIcon = (
      <IconButton aria-label='Play/Pause' onClick={this.toggleSlideShow} style={{ color: 'white' }}>
        {this.state.slideShow ? <span role='img' aria-label='pause'>{timer} &#x270B;</span> : <span role='img' aria-label='play'>&#x27A4;</span> }
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
