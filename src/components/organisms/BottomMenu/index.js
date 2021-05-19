import React from 'react'
import ReactDOM from 'react-dom'

import NavTabs from 'components/organisms/NavTabs'

import * as $ from './index.style'


const HEADER_CONTAINER_ID = 'bottom-menu-header-root'

const BottomMenu = () => (
  <div className={$.bottomMenu}>
    <div id={HEADER_CONTAINER_ID}/>
    <NavTabs/>
  </div>
)

export default BottomMenu


export class BottomMenuHeaderPortal extends React.Component {
  constructor(props) {
    super(props)

    this._header = document.createElement('div')
    this._header.classList.toggle($.header, true)
  }

  componentDidMount() {
    document.getElementById(HEADER_CONTAINER_ID).appendChild(this._header)
  }

  componentWillUnmount() {
    document.getElementById(HEADER_CONTAINER_ID).removeChild(this._header)
  }

  render() {
    const {children} = this.props

    return ReactDOM.createPortal(children, this._header)
  }
}