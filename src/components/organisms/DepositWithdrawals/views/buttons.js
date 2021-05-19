import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Button from 'components/atoms/Button'

import * as $ from './buttons.style'
import {TYPES} from '../types'


const Buttons = ({onClick, selectedType, l}) => (
  <div className={$.buttons}>
    <Button gray sm active={selectedType === TYPES.DEPOSIT}
            onClick={() => onClick(TYPES.DEPOSIT)}>
      {l('deposit')}
    </Button>
    <Button gray sm active={selectedType === TYPES.WITHDRAWAL}
            onClick={() => onClick(TYPES.WITHDRAWAL)}>
      {l('withdrawal')}
    </Button>
    {/*<button className={tradeClass} type="button"*/}
    {/*onClick={() => onClick(TYPES.TRADE)}>*/}
    {/*{l('trade')}*/}
    {/*</button>*/}
    <Button gray sm active={selectedType === TYPES.HISTORY}
            onClick={() => onClick(TYPES.HISTORY)}>
      {l('history')}
    </Button>
  </div>
)

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('withdrawalsPanel.btn.' + key),
})

export default connect(mapStateToProps)(Buttons)