import React from 'react'
import Responsive from 'react-responsive'

import theme from 'theme'


export const Mobile = (props) => <Responsive {...props} maxWidth={theme.breakPoints.mobile.max}/>

export const Desktop = (props) => <Responsive {...props} minWidth={theme.breakPoints.desktop.min}/>