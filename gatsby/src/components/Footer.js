import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Image } from '.'

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  background: #333333;
  // grid-auto-rows: 80px;
  // img {
  //   height: 80px;
  // }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    img {
      width: 100%;
    }
  }
`

class Footer extends Component {
  render () {
    return (
      <StyledFooter>
        <Image src='footer.jpg' width='400px' />
        <div style={{ background: '#333333', textAlign: 'center' }}>
          <Typography style={{ color: 'white' }} variant='body1'>
            Copyrights © 2019 All Rights Reserved by NainativuCDS.org
          </Typography>
          <Typography style={{ color: 'white' }} variant='body1'>
            <a style={{ color: 'inherit', textDecoration: 'none' }} href='https://jana19.org' rel='noopener noreferrer' target='_blank'>
              Website Developed by <b>Jana</b>
            </a>
          </Typography>
        </div>
      </StyledFooter>
    )
  }
}

export default Footer
