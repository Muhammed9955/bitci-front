import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import cs from 'classnames'
import {push} from 'react-router-redux'

import paths from 'utils/paths'
import {selectPair} from 'store/state/app/actions'

import * as $ from './index.style'


class PairsList extends React.Component {
  render() {
    const {pairs, l, noHeader} = this.props

    return (
      <div className={$.pairsList}>
        {!noHeader && (
          <div className={$.header}>
            <div className={$.headerColumn}>{l('table.pairVol')}</div>
            <div className={$.headerColumn}>{l('table.lastPrice')}</div>
            <div className={$.headerColumn}>{l('table.change24')}</div>
          </div>
        )}
        <div className={$.body}>
          {pairs.map(this._renderLine)}
        </div>
      </div>
    )
  }

  _renderLine = ({pair, currencies, current = 0, volume = 0, change = 0, changePercent = 0}) => {
    const {l, onPairClick} = this.props
    const priceClass = cs({
      [$.lineWhiteText]: change === 0,
      [$.lineGreenText]: change > 0,
      [$.lineRedText]: change < 0,
    })
    const changeClass = cs($.changeInfo, {
      [$.changeInfoGreen]: change > 0,
      [$.changeInfoRed]: change < 0,
    })

    return (
      <div key={pair} className={$.line} onClick={() => onPairClick(pair)}>
        <div className={$.lineColumn}>
          <div><span className={$.lineWhiteText}>{currencies[0]}</span> / {currencies[1]}</div>
          <div>{l('table.vol')} {volume.toFixed(2)}</div>
        </div>
        <div className={$.lineColumn}>
          <span className={priceClass}>{current}</span>
        </div>
        <div className={$.lineColumn}>
          <div className={changeClass}>
            <span>{changePercent > 0 && '+'}{changePercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('marketsPanel.' + key)
})

const mapDispatchToProps = (dispatch) => ({
  onPairClick: (pair) => {
    dispatch(selectPair(pair))
    dispatch(push(paths.TRADES))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PairsList)