import React from 'react'
import { Hidden } from '@material-ui/core'

export const Desktop = ({ children, implementation = 'css' }) => (
  <Hidden only={['xs', 'sm']} implementation={implementation}>
    {children}
  </Hidden>
)

export const Mobile = ({ children, implementation = 'css' }) => (
  <Hidden only={['md', 'lg', 'xl']} implementation={implementation}>
    {children}
  </Hidden>
)
