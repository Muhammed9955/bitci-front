import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {cx} from 'react-emotion'
import {
  getActiveLanguage,
  getLanguages,
  getTranslate,
  setActiveLanguage
} from 'react-localize-redux/lib/index'

import paths from 'utils/paths'
import {Desktop, Mobile} from 'components/layout'

import marketsIco from 'img/dashboard-icons/candles.svg'
import tradesIco from 'img/dashboard-icons/trades.svg'
import fundsIco from 'img/dashboard-icons/wallet.svg'
import accountIco from 'img/dashboard-icons/user@2x.png'

import * as $ from './index.style'


const NavTabs = ({l, currentLanguage, languages, setLanguage}) => (
  <div className={$.navTabs}>

    <Mobile className={$.inner} component='div'>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.MARKETS}>
        <img className={$.ico} src={marketsIco}/>
        <span>{l('markets')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.TRADES}>
        <img className={$.ico} src={tradesIco}/>
        <span>{l('trades')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.FUNDS}>
        <img className={$.ico} src={fundsIco}/>
        <span>{l('funds')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.ACCOUNT}>
        <img className={$.ico} src={accountIco}/>
        <span>{l('account')}</span>
      </NavLink>
    </Mobile>

    <Desktop className={$.inner} component='div'>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.EXCHANGE}>
        <span>{l('exchange')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.WALLETS}>
        <span>{l('wallets')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.ORDERS}>
        <span>{l('orders')}</span>
      </NavLink>
      <NavLink activeClassName={$.tabActive} className={$.tab} to={paths.ACCOUNT}>
        <span>{l('account')}</span>
      </NavLink>
      <a className={$.tab} href="https://support.com" target="_blank">
        <span>{l('support')}</span>
      </a>
      <div className={cx('dropdown', $.tab)}>
        <a tabIndex="0" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span>{currentLanguage.name}</span>
          <span className="icon icon-triangle-down-gray"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdown">
          {languages.filter(({code}) => code !== currentLanguage.code).map(({code, name}) => (
            <a onClick={() => setLanguage(code)} key={code} className="dropdown-item" tabIndex="0">{name}</a>
          ))}
        </div>
      </div>
    </Desktop>

  </div>
)


const mapStateToProps = ({locale, router}) => ({
  router, // to update the component when location is changed
  languages: getLanguages(locale),
  l: (key) => getTranslate(locale)('tabs.' + key),
  currentLanguage: getActiveLanguage(locale),
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (code) => dispatch(setActiveLanguage(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs)