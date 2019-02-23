import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Typography,
  TextField,
  Button,
  Icon,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

const encode = (data) => Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')

const Main = styled.div`
  display: grid;
  grid-gap: 20px;
  justify-content: center;
`

const ContactDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactCard = withStyles({
  root: {
    height: 'auto',
    background: teal[800],
    textAlign: 'center',
    padding: '10px'
  }
})(Paper)

class ContactPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
      responseMessage: ''
    }
  }

  handleTextChange = (field, value) => this.setState({ [field]: value })

  clearForm = () => this.setState({ name: '', email: '', message: '', loading: false, responseMessage: '' })

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true }, () => {
      const { name, email, message } = this.state
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          name,
          email,
          message
        })
      })
        .then(() => this.setState({ loading: false, responseMessage: 'Form successfully submitted. Thank you.' }))
        .catch((error) => {
          this.setState({ loading: false, responseMessage: `Something went wrong while submitting the form. Please try again.` })
          console.log(error.message)
        })
    })
  }

  render () {
    const { edges: information } = this.props.data.allSanityInfo

    const members = information.find(info => info.node.name === 'members').node.description
    const contacts = information.find(info => info.node.name === 'contacts').node.description

    return (
      <Layout title='தொடர்புகள்' activePage='/contact'>
        <Main>
          <ContactDetails>
            <ContactCard elevation={24}>
              <Icon style={{ fontSize: 65, color: 'white' }}> people </Icon>
              <Typography style={{ color: 'white' }} variant='h6'>Our Members</Typography>
              <Typography style={{ color: 'white' }} variant='body2' component='div'>{ReactHtmlParser(contacts)}</Typography>
            </ContactCard>
            <ContactCard elevation={24}>
              <Icon style={{ fontSize: 65, color: 'white' }}> location_on </Icon>
              <Typography style={{ color: 'white' }} variant='h6'>Contact Details</Typography>
              <Typography style={{ color: 'white' }} variant='body2' component='div'>{ReactHtmlParser(members)}</Typography>
            </ContactCard>
          </ContactDetails>
          <form
            name='contact'
            method='post'
            action='/contact/'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            onSubmit={this.handleSubmit}
            style={{
              display: 'grid',
              padding: '20px',
              gridTemplateColumns: '1fr 1fr',
              gridGap: 20,
              justifyItems: 'center'
            }}
          >
            <input type='hidden' name='form-name' value='contact' />
            <TextField
              label='Name'
              type='text'
              required
              value={this.state.name}
              onChange={(e) => this.handleTextChange('name', e.target.value)}
              fullWidth
              disabled={this.state.loading}
              autoFocus
            />
            <TextField
              label='Email'
              type='email'
              required
              value={this.state.email}
              onChange={(e) => this.handleTextChange('email', e.target.value)}
              fullWidth
              disabled={this.state.loading}
            />
            <TextField
              label='Message'
              type='textbox'
              required
              value={this.state.message}
              onChange={(e) => this.handleTextChange('message', e.target.value)}
              fullWidth
              disabled={this.state.loading}
              multiline
              rows={10}
              rowsMax='10'
              style={{ gridColumn: '1/-1' }}
            />
            <Button
              variant='contained'
              type='submit'
              color='primary'
              disabled={this.props.loading}
              fullWidth
            >
              Send
              <Icon style={{ marginLeft: 5 }}>save</Icon>
            </Button>
            <Button variant='contained' color='secondary' type='reset' onClick={this.clearForm} fullWidth>
              Clear
              <Icon style={{ marginLeft: 5 }}>cancel</Icon>
            </Button>
          </form>
          <Dialog
            open={this.state.responseMessage !== ''}
            onClose={this.clearForm}
            disableBackdropClick
            aria-labelledby='Contact Form Response'
          >
            <DialogTitle id='Contact Form Response'>{this.state.responseMessage}</DialogTitle>
            <DialogActions>
              <Button onClick={this.clearForm} variant='contained' autoFocus color='primary'>OK</Button>
            </DialogActions>
          </Dialog>
        </Main>
      </Layout>
    )
  }
}

export default ContactPage

export const query = graphql`
  query AllInfo {
    allSanityInfo {
      edges {
        node {
          name,
          description
        }
      }
    }
  }
`
