import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import {push} from 'react-router-redux'

import Button from 'components/atoms/Button'
import Link from 'components/atoms/Link'
import {BottomMenuHeaderPortal} from 'components/organisms/BottomMenu'
import viewListImg from 'img/dashboard-icons/view-list.svg'
import paths, {fillPath} from 'utils/paths'

import * as $ from './index.style'


const Funds = ({balances, l, onDepositClick, onWithdrawalClick}) => {
  return (
    <div className={$.funds}>
      {/*<div className={$.estimated}>*/}
        {/*<span className={$.title}>{l('estimated')}</span>*/}
        {/*<span className={$.btc}>0.00002312 BTC</span>*/}
        {/*<span className={$.dollars}>$145.63</span>*/}
      {/*</div>*/}
      <div className={$.actions}>
        <Button className={$.btn} onClick={() => onDepositClick(balances[0].CurrencyType)} green>
          {l('btns.deposit')}
          </Button>
        <Button className={$.btn} onClick={() => onWithdrawalClick(balances[0].CurrencyType)} red>
          {l('btns.withdrawal')}
        </Button>
      </div>
      <div className={$.lines}>
        {balances.map(({Balance: balance, CurrencyType: currency}) => (
          <div key={currency} className={$.line}>
            <span className={$.currency}>{balance}</span>
            <span>{currency}</span>
          </div>
        ))}
      </div>
      {/*<BottomMenuHeaderPortal>*/}
        {/*<Link color="lightCyan">*/}
          {/*<span className={$.showAllBalances}>*/}
            {/*<img src={viewListImg}/>*/}
            {/*{l('btns.showAllBalances')}*/}
          {/*</span>*/}
        {/*</Link>*/}
      {/*</BottomMenuHeaderPortal>*/}
    </div>
  )
}

const mapStateToProps = ({app, locale}) => ({
  balances: app.balances,
  l: (key) => getTranslate(locale)('fundsPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  onDepositClick: (currency) => dispatch(push(fillPath(paths.FUNDS_DEPOSIT, {currency}))),
  onWithdrawalClick: (currency) => dispatch(push(fillPath(paths.FUNDS_WITHDRAWAL, {currency}))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Funds)