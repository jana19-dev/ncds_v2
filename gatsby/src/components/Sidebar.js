import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon
} from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { Image } from '.'
import { links } from '../helpers'

const StyledListItem = withStyles({
  root: {
    minHeight: 60,
    '&:hover': {
      backgroundColor: `${teal[700]}`
    },
    '&$selected': {
      backgroundColor: `${teal[700]} !important`
    }
  },
  selected: { }
})(ListItem)

const StyledListItemText = withStyles({
  primary: {
    color: 'white',
    fontSize: 18
  }
})(ListItemText)

const renderItem = ({ label, page, icon, activePage }) => (
  <StyledListItem
    key={page}
    button
    divider
    selected={activePage === page}
    component={props => <Link to={page} {...props} />}
    style={page === '/' ? { display: 'none' } : {}}
  >
    <ListItemIcon><Icon style={{ color: 'white' }}>{icon}</Icon></ListItemIcon>
    <StyledListItemText primary={label} />
  </StyledListItem>
)

const Sidebar = ({ activePage, open, toggleSidebar }) => {
  const StyledSwipeableDrawer = withStyles({
    paper: {
      width: 250,
      border: 'none',
      textAlign: 'center',
      zIndex: 'auto',
      background: teal[900]
    }
  })(SwipeableDrawer)

  return (
    <StyledSwipeableDrawer
      open={open}
      variant='temporary'
      onOpen={() => toggleSidebar(true)}
      onClose={() => toggleSidebar(false)}
    >
      <Image src='logo.png' width='150px' />
      <List style={{ paddingTop: 0 }}>
        {links.map((item) => renderItem({ ...item, activePage }))}
      </List>
    </StyledSwipeableDrawer>
  )
}

Sidebar.defaultProps = {
  activePage: '/',
  open: false
}

Sidebar.propTypes = {
  activePage: PropTypes.string.isRequired,
  open: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

export default Sidebar
