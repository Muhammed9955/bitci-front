import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'
import {Switch, Route} from 'react-router-dom'

import Page from 'components/pages/Page'
import TopMenu from 'components/atoms/TopMenu'
import Markets from 'components/organisms/Markets'
import PairsSearchOverlay from 'components/organisms/PairsSearchOverlay'
import paths from 'utils/paths'


const MarketsPage = ({l}) => (
  <Switch>
    <Route path={paths.MARKETS_SEARCH} component={PairsSearchOverlay}/>

    <Page>
      <TopMenu>
        {l('title')}
      </TopMenu>
      <Markets/>
    </Page>
  </Switch>
)

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('marketsPanel.' + key),
})

export default connect(mapStateToProps)(MarketsPage)