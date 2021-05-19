import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import cs from 'classnames'

import {Desktop, Mobile} from 'components/layout'
import NumberInput from 'components/atoms/NumberInput'
import {getSelectedPairData, getPriceFormat} from 'store/state/app/selectors'

import * as $ from './index.style'

const PriceInput = ({price, currency, onChange, green, red, format, ...internalProps}) => {
  const {increase, decrease} = internalProps
  const priceInputClass = cs($.priceInput, {
    [$.green]: green,
    [$.red]: red,
  })

  return (
    <div className={priceInputClass}>
      <Mobile className={$.left} component='div'>
        <div className={cs($.aloneBtn, $.aloneDecreaseBtn)} onClick={() => onChange(decrease(price))}/>
      </Mobile>
      <div className={$.inputContainer}>
        <NumberInput format={format} className={$.input} value={price} onChange={(value) => onChange(value)}/>
      </div>
      <Mobile className={$.right} component='div'>
        <div className={cs($.aloneBtn, $.aloneIncreaseBtn)} onClick={() => onChange(increase(price))}/>
      </Mobile>
      <Desktop className={$.right} component='div'>
        <span className={$.currency}>{currency}</span>
        <div className={$.btns}>
          <div className={cs($.pairBtn, $.pairIncreaseBtn)} onClick={() => onChange(increase(price))}/>
          <div className={cs($.pairBtn, $.pairDecreaseBtn)} onClick={() => onChange(decrease(price))}/>
        </div>
      </Desktop>
    </div>
  )
}

const mapStateToProps = ({app}, {format: extFormat}) => {
  const {tickSize} = getSelectedPairData(app)
  const priceFormat = getPriceFormat(app)
  const format =  extFormat || priceFormat

  return {
    format,
    increase: (val) => numeral(Number(val) + tickSize).format(format),
    decrease: (val) => {
      const newVal = Number(val) - tickSize
      return numeral(newVal < 0 ? 0 : newVal).format(format)
    }
  }
}

export default connect(mapStateToProps)(PriceInput)