import React from 'react'
import cs from 'classnames'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import {cx} from 'react-emotion'
import numeral from 'numeral'

import {connectData, DATA_TYPES} from 'utils/collector'
import {SellDepthTable, BuyDepthTable} from 'components/organisms/DepthTable'
import {Desktop, Mobile} from 'components/layout'
import {setValue} from 'store/state/ui/forms/actions'
import {ORDER_BUY, ORDER_SELL} from 'store/state/ui/forms/constants'
import {getPriceFormat} from 'store/state/app/selectors'

import * as $ from './index.style'


class OrderBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHovering: false,
    }
  }

  render() {
    const {currPrice, isGreater, selectedPair, l, format} = this.props
    const {isHovering} = this.state

    const icon = cs('icon ml-2', {
      'icon-triangle-up': isGreater,
      'icon-triangle-down': !isGreater,
    })
    const incrementArea = cs($.incrementArea, {
      [$.incrementAreaGreen]: isGreater,
      [$.incrementAreaRed]: !isGreater,
    })
    const currencies = selectedPair ? selectedPair.split('-') : ['', '']

    return (
      <div className={cx('main-item-box full-width', $.orderBook)}
           onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
        <Desktop component='header'>
          <h3>{l('title')}</h3>
        </Desktop>
        <div className={cx('default-table', $.table)}>
          <div className={$.header}>
            <div className={$.head}>{l('columns.price', {currency: currencies[1]})}</div>
            <div className={$.head}>{l('columns.amount')} <Mobile>({currencies[0]})</Mobile></div>
            <Desktop component='div' className={$.head}>{l('columns.total')}</Desktop>
          </div>
          <div className={$.depthTableContainer}>
            <SellDepthTable lower red isHovering={isHovering} onLineClick={this._onSellLineClick}/>
          </div>
          <div className={incrementArea}>
            {format(currPrice)}&nbsp;
            <Desktop component='i' className={icon} style={{width: 14, height: 8}}/>
          </div>
          <div className={$.depthTableContainer}>
            <BuyDepthTable green isHovering={isHovering} onLineClick={this._onBuyLineClick}/>
          </div>
        </div>
      </div>
    )
  }

  _onMouseEnter = (event) => {
    const {onMouseEnter} = this.props

    if (onMouseEnter) {
      this.setState({
        isHovering: true,
      })

      return onMouseEnter(event)
    }
  }

  _onMouseLeave = (event) => {
    const {onMouseLeave} = this.props

    if (onMouseLeave) {
      this.setState({
        isHovering: false,
      })

      return onMouseLeave(event)
    }
  }

  _onSellLineClick = ({price}) => {
    const {onSellPriceClick} = this.props

    onSellPriceClick(price)
  }

  _onBuyLineClick = ({price}) => {
    const {onBuyPriceClick} = this.props

    onBuyPriceClick(price)
  }
}

const mapDataToProps = ({current: currPrice = 0, prev: prevCurrPrice = 0}) => ({
  currPrice,
  isGreater: currPrice > prevCurrPrice,
})

const mapStateToProps = ({app, locale}) => ({
  selectedPair: app.selectedPair,
  l: (key, params) => getTranslate(locale)('orderBookPanel.' + key, params),
  format: (val) => numeral(val).format(getPriceFormat(app)),
})

const mapDispatchToProps = (dispatch) => {
  const setPrices = (price) => {
    dispatch(setValue(ORDER_BUY, 'limit', price))
    dispatch(setValue(ORDER_SELL, 'limit', price))
  }

  return {
    onBuyPriceClick: setPrices,
    onSellPriceClick: setPrices,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectData(DATA_TYPES.COLL_CURRENT_PRICE, mapDataToProps)(OrderBook),
)