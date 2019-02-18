import React from 'react'
import { Hidden } from '@material-ui/core'

export const Desktop = ({ children }) => (
  <Hidden only={['xs', 'sm']} implementation='js'>
    {children}
  </Hidden>
)

export const Mobile = ({ children }) => (
  <Hidden only={['md', 'lg', 'xl']} implementation='js'>
    {children}
  </Hidden>
)
