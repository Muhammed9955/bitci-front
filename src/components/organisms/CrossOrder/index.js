import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import cs from 'classnames'

import OrderForm from 'components/organisms/OrderForm'
import IDropdown from 'components/atoms/IDropdown'
import Label from 'components/atoms/Label'
import {ORDER_TYPES} from 'utils/constants'
import {CROSS_ORDER} from 'store/state/ui/forms/constants'
import {setValue} from 'store/state/ui/forms/actions'

import * as $ from './index.style'


const CrossOrder = ({currencies, firstCurrency, secondCurrency, size, setValue, l}) => {
  return (
    <div className={$.crossOrder}>
      <div className={cs('row', $.currencies)}>
        <div className={cs('col-md-3', $.labelContainer)}>
          <Label value={l('currency')}/>
        </div>
        <div className={cs('cold-md-3', $.dropContainer)}>
          <IDropdown value={firstCurrency || '- -'} onChange={(val) => setValue('firstCurrency', val)}
                     values={currencies.filter((curr) => curr !== secondCurrency)} dark/>
        </div>
        <div className={cs('col-md-3', $.labelContainer)}>
          <Label value={l('currency')}/>
        </div>
        <div className={cs('col-md-3', $.dropContainer)}>
          <IDropdown value={secondCurrency || '- -'} onChange={(val) => setValue('secondCurrency', val)}
                     values={currencies.filter((curr) => curr !== firstCurrency)} dark/>
        </div>
      </div>
      <OrderForm type={ORDER_TYPES.MARKET} submitTxt={l('btns.comingSoon')} size={0} onChange={setValue}
                 firstCurrency={firstCurrency} secondCurrency={secondCurrency}/>
    </div>
  )
}

const mapStateToProps = ({app, locale, ui}) => {
  const pairs = Object.keys(app.pairs)
  const currenciesSet = pairs.reduce((set, pair) => {
    pair.split('-').forEach((curr) => set.add(curr))

    return set
  }, new Set)

  const {firstCurrency, secondCurrency, size} = ui.forms[CROSS_ORDER]

  return {
    firstCurrency,
    secondCurrency,
    size,
    currencies: Array.from(currenciesSet),
    l: (key) => getTranslate(locale)('crossOrderPanel.' + key),
  }
}

const mapDispatchToProps = (dispatch) => ({
  setValue: (field, value) => dispatch(setValue(CROSS_ORDER, field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CrossOrder)