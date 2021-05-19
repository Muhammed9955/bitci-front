import React from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'

import Overlay from 'components/atoms/Overlay'
import Input from 'components/atoms/Input'
import Link from 'components/atoms/Link'
import PairsList from 'components/organisms/PairsList'
import {getPairsList} from 'store/state/app/selectors'
import searchIco from 'img/dashboard-icons/search@2x.png'

import * as $ from './index.style'


const CURRENCY_SPLIT_REGEX = /[^\w\d]/

class PairsSearchOverlay extends React.Component {
  state = {filter: ''}

  render() {
    const {pairs} = this.props

    const filteredPairs = pairs.filter(this._filter)

    return (
      <Overlay header={this._headerRender()}>
        <PairsList pairs={filteredPairs} noHeader/>
      </Overlay>
    )
  }

  _headerRender = () => {
    const {onCancelClick} = this.props
    const {filter} = this.state

    const inputBefore = (
      <div className={$.searchIcoContainer}>
        <img src={searchIco}/>
      </div>
    )
    const inputAfter = (
      <div className={$.cancelContainer}>
        <Link sm color="white" onClick={onCancelClick}>Cancel</Link>
      </div>
    )

    return (
      <div className={$.header}>
        <Input value={filter} onChange={this._onFilterChange} autoFocus before={inputBefore} after={inputAfter}/>
        <span className={$.tip}>Search results: </span>
      </div>
    )
  }

  _filter = ({pair}) => {
    const {filter} = this.state

    if(!filter) return true

    const findCurrencies = filter.toLowerCase().split(CURRENCY_SPLIT_REGEX).filter(Boolean)

    return !findCurrencies.some((curr) => !pair.toLowerCase().includes(curr))
  }

  _onFilterChange = ({target}) => this.setState({filter: target.value})
}

const mapStateToProps = ({app}) => ({
  pairs: getPairsList(app),
})

const mapDispatchToProps = (dispatch) => ({
  onCancelClick: () => dispatch(goBack())
})

export default connect(mapStateToProps, mapDispatchToProps)(PairsSearchOverlay)