import React from 'react'
import {connect} from 'react-redux'

import SwitchTabs from 'components/atoms/SwitchTabs'
import PairsList from 'components/organisms/PairsList'
import {getPairData} from 'store/state/app/selectors'

import * as $ from './index.style'
import {getTranslate} from 'react-localize-redux/lib/index'

const FAV_TAB = 'favorites'

class Markets extends React.Component {
  state = {
    activeTab: FAV_TAB,
  }

  componentDidMount() {
    const {activeTab} = this.state
    const tabs = this._getTabs()
    const filteredPairs = this._getFilteredPairs()

    if(activeTab === FAV_TAB && filteredPairs.length < 1 && tabs[1]) this._switchTab(tabs[1].code)
  }

  render() {
    const {activeTab} = this.state

    return (
      <div className={$.markets}>
        <SwitchTabs tabs={this._getTabs()} active={activeTab} onSwitch={this._switchTab}/>
        <PairsList pairs={this._getFilteredPairs()}/>
      </div>
    )
  }

  _getFilteredPairs = () => {
    const {pairs} = this.props
    const {activeTab} = this.state

    if(activeTab === FAV_TAB) {
      return pairs.filter(({favorite}) => favorite)
    } else {
      return pairs.filter(({currencies}) => currencies[1] === activeTab)
    }
  }

  _getTabs = () => {
    const {secondCurrencies, l} = this.props
    const currenciesTabs = secondCurrencies.map((curr) => ({title: curr, code: curr}))

    return [{title: l(FAV_TAB), code: FAV_TAB}].concat(currenciesTabs)
  }

  _switchTab = (activeTab) => (
    this.setState({activeTab})
  )
}

const mapStateToProps = ({app, locale}) => {
  const pairNames = Object.keys(app.pairs)
  const pairs = pairNames.map((pairName) => getPairData(app, pairName))
  const secondCurrencies = Array.from(new Set(pairs.map(({currencies}) => currencies[1])))

  return {
    pairs,
    secondCurrencies,
    l: (key) => getTranslate(locale)('marketsPanel.' + key),
  }
}

export default connect(mapStateToProps)(Markets)