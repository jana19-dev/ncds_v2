import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { teal, red } from '@material-ui/core/colors'
import {
  SEO,
  Sidebar,
  Topbar,
  Footer
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
      sidebarOpen: false,
      isMobile: false
    }
  }

  componentDidMount = () => {
    const isMobile = window.innerWidth < 768
    this.setState({ isMobile })
  }

  toggleSideBar = () => this.setState({ sidebarOpen: true })

  render () {
    const { title, activePage, children } = this.props
    const { sidebarOpen, isMobile } = this.state

    const padding = isMobile ? '140px 10px 20px 10px' : '220px 10px 20px 10px'

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <SEO title={title} keywords={[`ncds`, `nainativu`, `nainativu CDS`, `nainativucds.org`]} />
        <div style={{ backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '100vh', minWidth: 400 }}>
          {isMobile &&
            <Sidebar activePage={activePage} open={sidebarOpen} toggleSidebar={sidebarOpen => this.setState({ sidebarOpen })} />
          }
          <Topbar title={title} activePage={activePage} toggleSideBar={isMobile ? this.toggleSideBar : null} />
          <div style={{ minHeight: '100vh', padding }}>
            {children}
          </div>
          <Footer />
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
