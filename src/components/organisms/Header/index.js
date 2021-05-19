import React from 'react'

import StatusPanel from 'components/organisms/StatusPanel'
import NavTabs from 'components/organisms/NavTabs'
import logo from 'img/logo@2x.png'


const Header = () => (
  <div className="navigation-bar">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-xs-3">
          <a className="d-logo" href="/home.html">
            <img src={logo} alt=""/>
          </a>
        </div>
        <div className="col-md-6 col-xs-6">
          <NavTabs/>
        </div>
        <div className="col-md-3 col-xs-3">
          <StatusPanel/>
        </div>
      </div>
    </div>
  </div>
)

export default Header