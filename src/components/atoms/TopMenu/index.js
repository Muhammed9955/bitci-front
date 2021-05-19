import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import logo from 'img/logo-xs@2x.png'
import search from 'img/dashboard-icons/search@2x.png'
import paths from 'utils/paths'

import * as $ from './index.style'


class TopMenu extends React.Component {
  render() {
    const {children, onSearchClick} = this.props

    return (
      <div className={$.topMenu}>
        <a className={$.logo}>
          <img src={logo}/>
        </a>
        <div className={$.content}>
          {children}
        </div>
        <a className={$.search} onClick={onSearchClick}>
          <img src={search}/>
        </a>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearchClick: () => dispatch(push(paths.MARKETS_SEARCH)),
})

export default connect(null, mapDispatchToProps)(TopMenu)