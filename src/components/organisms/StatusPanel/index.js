import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {getTranslate} from 'react-localize-redux'
import cs from 'classnames'

import {connectStatus} from 'utils/socket'
import PATHS from 'utils/paths'
import {socketConnect, socketDisconnect, logoutUser} from 'store/state/app/actions'
import disconnectedIco from 'img/disconnected.png'
import connectedIco from 'img/dashboard-icons/settings@2x.png'
import Link from 'components/atoms/Link'

import * as $ from './index.style'


const StatusPanel = ({onAccountClick, isConnected, connect, disconnect, logout, username, l}) => {
  const connectionContent = isConnected
    ? <Link onClick={disconnect} className={$.link}>
      <img src={connectedIco} className={$.stateIco}/>
      <span>{l('connected')}</span>
    </Link>
    : <Link onClick={connect} className={$.link}>
      <img src={disconnectedIco} className={$.stateIco}/>
      <span>{l('notConnected')}</span>
    </Link>

  return (
    <div className={$.statusPanel}>
      <Link className={cs($.link, $.user)}>
        <span onClick={onAccountClick}>{username || '\xa0'}</span>
        <span onClick={logout}>{l('logout')}</span>
      </Link>
      <Link onClick={onAccountClick} className={$.link}>
        <i className="icon icon-user"/>
      </Link>
      {connectionContent}
    </div>
  )
}
const mapStateToProps = ({app, locale}) => ({
  username: app.user.username,
  l: (key) => getTranslate(locale)('statusPanel.' + key),
})

const mapDispatchToPtops = (dispatch) => ({
  connect: () => dispatch(socketConnect()),
  disconnect: () => dispatch(socketDisconnect()),
  logout: () => dispatch(logoutUser()),
  onAccountClick: () => dispatch(push(PATHS.ACCOUNT)),
})

export default connect(mapStateToProps, mapDispatchToPtops)(
  connectStatus(
    (isConnected) => ({isConnected}),
  )(StatusPanel),
)