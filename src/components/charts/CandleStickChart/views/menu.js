import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Dropdown from 'components/atoms/Dropdown'


const Menu = ({activeIndicator, indicators = [], onChange, l}) => {
  return (
    <Dropdown value={l(activeIndicator || 'indicator')}>
      {indicators.filter((i) => i !== activeIndicator).map((i) => (
        <a key={i} onClick={() => onChange(i)}>{l(i) || '- -'}</a>
      ))}
    </Dropdown>
  )
}

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('candlestickChart.' + key),
})

export default connect(mapStateToProps)(Menu)