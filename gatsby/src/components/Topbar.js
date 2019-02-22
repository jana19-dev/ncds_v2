import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import { teal } from '@material-ui/core/colors'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Icon,
  Tabs,
  Tab
} from '@material-ui/core'
import { Image } from '.'
import { links } from '../helpers'

const StyledTab = withStyles({
  label: {
    fontWeight: '1000',
    fontSize: 18
  }
})(Tab)

const renderTab = ({ label, page }) => (
  <StyledTab
    key={page}
    value={page}
    label={label}
    component={props => <Link to={page} {...props} />}
    style={page === '/' ? { display: 'none' } : {}}
  />
)

const Topbar = ({ toggleSideBar, title, activePage }) => {
  const TopBar = withStyles({
    positionStatic: {
      position: 'fixed'
    }
  })(AppBar)

  return (
    <TopBar position='static' style={{ background: teal[900] }}>
      <Link to='/'>
        <Image src={toggleSideBar ? 'banner_mobile.jpg' : 'banner.jpg'} />
      </Link>
      <Toolbar style={{ justifyContent: toggleSideBar ? 'left' : 'center', minHeight: 40 }}>
        {toggleSideBar
          ? <>
            <Button onClick={toggleSideBar}><Icon style={{ color: 'white' }}>menu</Icon></Button>
            <Typography variant='h6' style={{
              color: 'white',
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: -1
            }}>
              {title}
            </Typography>
          </>
          : <Tabs
            value={activePage}
            variant='scrollable'
            scrollButtons='auto'
          >
            {links.map(renderTab)}
          </Tabs>
        }
      </Toolbar>
    </TopBar>
  )
}

Topbar.defaultProps = {
  activePage: '/'
}

Topbar.propTypes = {
  activePage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleSideBar: PropTypes.func
}

export default Topbar
