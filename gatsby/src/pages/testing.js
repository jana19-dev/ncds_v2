import React from 'react'
import { Layout } from '../components'
import {
  TextField,
  Button,
  Icon,
  Dialog,
  DialogActions,
  DialogTitle,
  withMobileDialog
} from '@material-ui/core'

const encode = (data) => Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')

class TestingPage extends React.Component {
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
    const { fullScreen } = this.props

    return (
      <Layout title='Testing' activePage='/contact/' >
        <form
          name='contact'
          method='post'
          action='/contact/'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          onSubmit={this.handleSubmit}
          style={{
            display: 'grid',
            padding: '20px 20px',
            gridGap: 40,
            maxWidth: 500,
            justifyItems: 'center',
            margin: '0 auto'
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
            value={this.state.message}
            onChange={(e) => this.handleTextChange('message', e.target.value)}
            fullWidth
            disabled={this.state.loading}
            multiline
            rows={10}
            rowsMax='10'
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disabled={this.props.loading}
            style={{ maxWidth: 200 }}
          >
            Send Message
            <Icon style={{ marginLeft: 5 }}>save</Icon>
          </Button>
          <Button variant='contained' color='secondary' type='reset' onClick={this.clearForm} style={{ maxWidth: 200 }}>
            Cancel
            <Icon style={{ marginLeft: 5 }}>cancel</Icon>
          </Button>
        </form>
        <Dialog
          open={this.state.responseMessage !== ''}
          onClose={this.clearForm}
          disableBackdropClick
          aria-labelledby='Testing Form Response'
          style={fullScreen ? {} : { marginLeft: 240 }}
        >
          <DialogTitle id='Testing Form Response'>{this.state.responseMessage}</DialogTitle>
          <DialogActions>
            <Button onClick={this.clearForm} variant='contained' autoFocus color='primary'>OK</Button>
          </DialogActions>
        </Dialog>
      </Layout>
    )
  }
}

export default withMobileDialog()(TestingPage)
