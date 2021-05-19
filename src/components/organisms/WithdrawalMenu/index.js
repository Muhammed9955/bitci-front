import React from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import {getTranslate} from 'react-localize-redux'
import numeral from 'numeral'

import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import {ID_VERIF_STATUSES} from 'utils/constants'
import {getWalletInfo} from 'store/state/app/selectors'
import {withdraw} from 'store/state/app/actions'
import {setValue, resetForm} from 'store/state/ui/forms/actions'
import {WITHDRAWAL} from 'store/state/ui/forms/constants'

import * as $ from './index.style'


class WithdrawalMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValid: false,
      errMessages: [],
    }
  }

  componentDidMount() {
    this.props.reset()
    this._validate()
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) this._validate()
  }

  render() {
    const {currency, balance, verified, withTag, isProcessing, onSubmit, fee, l, amount, address, tag} = this.props
    const {isValid, errMessages} = this.state

    return (
      <div className={$.withdrawalMenu}>
        <div className={$.side}>
          <div className={$.line}>
            <span className={$.label}>{l('withdrawalAddress', {currency})}</span>
            <div className={$.info}>
              <div className={$.inputContainer}>
                <Input lg value={address} onChange={this._onAddressChange}/>
              </div>
            </div>
          </div>
          {withTag && (
            <div className={$.line}>
              <span className={$.label}>{l('withdrawalTag')}</span>
              <div className={$.info}>
                <div className={$.inputContainer}>
                  <Input lg value={tag} onChange={this._onTagChange}/>
                </div>
              </div>
            </div>
          )}
          <div className={$.line}>
            <ul className={$.amountVariants}>
              <li><a tabIndex="0" onClick={() => this._setAmountPart(.25)}>25%</a></li>
              <li><a tabIndex="0" onClick={() => this._setAmountPart(.50)}>50%</a></li>
              <li><a tabIndex="0" onClick={() => this._setAmountPart(.75)}>75%</a></li>
              <li><a tabIndex="0" onClick={() => this._setAmountPart(1)}>Max</a></li>
            </ul>
          </div>
          <div className={$.line}>
            <span className={$.label}>Amount</span>
            <div className={$.info}>
              <div className={$.inputContainer}>
                <Input lg value={amount} onChange={this._onAmountChange} after={(
                  <div className={$.itemsContainer}>
                    <span className={$.itemsText}>{l('available')}: {balance.toFixed(8)}</span>
                  </div>
                )}/>
              </div>
            </div>
          </div>
          {/*<div className="row justify-content-end">*/}
          {/*<div className={cx('col-xs-3 col-md-3 text-danger', $.dangerTip)}>*/}
          {/*{l('withdrawalDangerTip')}*/}
          {/*</div>*/}
          {/*</div>*/}
          <div className={$.line}>
            <span className={$.label}>{l('fee')}</span>
            <div className={$.info}>
              <div className={$.inputContainer}>
                <Input lg readOnly value={fee} after={(
                  <div className={$.itemsContainer}>
                    <span className={$.itemsText}>
                      {l('willGet')}: {amount > fee ? numeral(amount).difference(fee) : 0}
                    </span>
                  </div>
                )}/>
              </div>
              <Button green lg disabled={!verified || isProcessing || !isValid} className={$.submitBtn}
                      onClick={() => onSubmit(address, amount, withTag ? tag : null)}>
                {l('submit')}
              </Button>
            </div>
          </div>
        </div>
        <div className={$.side}>
          {verified ? errMessages.map(this._renderMsg) : this._renderMsg(l('withdrawalTip.desc'))}
        </div>
      </div>
    )
  }

  _renderMsg = (msg) => (
    <div className={$.line} key={msg}>
      <span className={$.withdrawalTip}>{msg}</span>
    </div>
  )

  _onAddressChange = ({target}) => this.props.setValue('address', target.value)

  _onTagChange = ({target}) => this.props.setValue('tag', target.value)

  _onAmountChange = (eventOrValue) => {
    let amount = eventOrValue

    if (eventOrValue.target) amount = eventOrValue.target.value

    this.props.setValue('amount', amount)
  }

  _setAmountPart = (part) => {
    const {balance} = this.props

    this._onAmountChange(balance * part)
  }

  _validate = () => this.setState(() => {
    const {withTag, balance, minWithdraw, addressRegex, fee, l, address, amount, tag} = this.props
    const amountNumber = Number(amount)

    const errMessages = []

    if (!addressRegex.test(address)) errMessages.push(l('withdrawalErrors.wrongAddress'))
    if (withTag && !tag) errMessages.push(l('withdrawalErrors.wrongTag'))
    if (amountNumber > balance) errMessages.push(l('withdrawalErrors.insufficientBalance'))

    if (amountNumber < minWithdraw) errMessages.push(l('withdrawalErrors.minAmount', {min: minWithdraw}))
    else if (amountNumber <= fee) errMessages.push(l('withdrawalErrors.amountLessFee'))

    return {
      errMessages,
      isValid: errMessages.length === 0,
    }
  })
}

const mapStateToProps = ({app, locale, ui}, {currency}) => {
  const asset = app.balances.find((asset) => asset.CurrencyType === currency)
  const {address, tag, amount} = ui.forms[WITHDRAWAL]

  return {
    address,
    tag,
    amount,
    verified: app.user.idVerification === ID_VERIF_STATUSES.VERIFIED,
    isProcessing: app.withdrawProcessing,
    withTag: Boolean(getWalletInfo(app, currency).tag),
    balance: get(asset, 'Balance', 0),
    minWithdraw: get(asset, 'minProductWithdraw', 0),
    addressRegex: new RegExp(get(asset, 'regex', '')),
    fee: get(asset, 'transactionFee', 0),
    l: (key, params) => getTranslate(locale)('withdrawalsPanel.menu.' + key, params),
  }
}

const mapDispatchToProps = (dispatch, {currency}) => ({
  setValue: (field, value) => dispatch(setValue(WITHDRAWAL, field, value)),
  reset: () => dispatch(resetForm(WITHDRAWAL)),
  onSubmit: (address, amount, tag) => dispatch(withdraw(currency, address, amount, tag ? tag : null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalMenu)