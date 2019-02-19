import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { teal, red } from '@material-ui/core/colors'
import {
  SEO,
  Sidebar,
  Topbar,
  Footer,
  Desktop,
  Mobile
} from '.'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red
  },
  typography: {
    useNextVariants: true
  }
})

class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
  }

  toggleSideBar = () => this.setState({ sidebarOpen: true })

  render () {
    const { title, activePage, children } = this.props
    const { sidebarOpen } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <SEO title={title} keywords={[`ncds`, `nainativu`, `nainativu CDS`, `nainativucds.org`]} />
        <div style={{ backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '100vh', minWidth: 400 }}>
          <Desktop>
            <Topbar title={title} activePage={activePage} />
            <div style={{ minHeight: '100vh', padding: '220px 10px 10px 10px' }}>
              {children}
            </div>
            <Footer />
          </Desktop>
          <Mobile>
            <Sidebar activePage={activePage} open={sidebarOpen} toggleSidebar={sidebarOpen => this.setState({ sidebarOpen })} />
            <Topbar title={title} toggleSideBar={this.toggleSideBar} />
            <div style={{ minHeight: '100vh', padding: '150px 10px 10px 10px' }}>
              {children}
            </div>
            <Footer />
          </Mobile>
        </div>
      </MuiThemeProvider>
    )
  }
}

Layout.defaultProps = {
  title: 'Home',
  activePage: '/'
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  activePage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Layout
