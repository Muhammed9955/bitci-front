import React from 'react'
import 'react-tippy/dist/tippy.css'
import {Tooltip as TippyTooltip} from 'react-tippy'


const Tooltip = ({children, ...props}) => (
  <TippyTooltip position='top' arrow='true' size='small' animation='fade' distance={10} hideDelay={0} {...props}>
    {children}
  </TippyTooltip>
)


export default Tooltip