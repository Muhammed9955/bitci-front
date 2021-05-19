import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import TransactionsHistory from 'components/organisms/TransactionsHistory'
import {getDepositsHistory, getWithdrawalsHistory} from 'store/state/app/selectors'

import * as $ from './index.style'


const DepositsWithdrawalsHistory = ({l, deposits, withdrawals}) => {
  return (
    <div className={$.depositsWithdrawalsHistory}>
      <TransactionsHistory title={l('deposits.title')} exportTitle={l('deposits.exportHistory')}
                           history={deposits}/>
      <TransactionsHistory title={l('withdrawals.title')} exportTitle={l('withdrawals.exportHistory')}
                           history={withdrawals}/>
    </div>
  )
}

const mapStateToProps = ({locale, app}, {currency}) => ({
  l: (key) => getTranslate(locale)('depositsWithdrawalsHistoryPanel.' + key),
  deposits: getDepositsHistory(app, currency),
  withdrawals: getWithdrawalsHistory(app, currency),
})

export default connect(mapStateToProps)(DepositsWithdrawalsHistory)