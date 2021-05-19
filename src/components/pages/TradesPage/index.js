import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import {Route, Switch} from 'react-router-dom'
import {push} from 'react-router-redux'

import {selectPair} from 'store/state/app/actions'
import Page from 'components/pages/Page'
import TopMenu from 'components/atoms/TopMenu'
import Dropdown from 'components/atoms/Dropdown'
import Overlay from 'components/atoms/Overlay'
import Trades from 'components/organisms/Trades'
import OrdersHistory from 'components/organisms/OrdersHistory'
import paths from 'utils/paths'


const TradesPage = ({selectedPair, pairs, selectPair, l, onOpenOrdersClick}) => (
  <Switch>
    <Route path={paths.TRADES_ORDERS}>
      <Overlay title={l('tradeHistory')}>
        <OrdersHistory/>
      </Overlay>
    </Route>

    <Page>
      <TopMenu>
        <Dropdown value={selectedPair} values={pairs} onChange={selectPair} white lg/>
      </TopMenu>
      <Trades onOpenOrders={onOpenOrdersClick}/>
    </Page>
  </Switch>
)

const mapStateToProps = ({app, locale}) => ({
  selectedPair: app.selectedPair,
  pairs: Object.keys(app.pairs),
  l: (key) => getTranslate(locale)('tradesPanel.' + key),
})

const mapDispatchToProps = (dispatch) => ({
  selectPair: (pair) => dispatch(selectPair(pair)),
  onOpenOrdersClick: () => dispatch(push(paths.TRADES_ORDERS)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradesPage)