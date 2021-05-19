import React from 'react'
import {cx} from 'react-emotion'

import * as $ from './index.style'


class SwitchTabs extends React.Component {
  render() {
    const {tabs, active, dark, noBorder} = this.props

    const className = cx($.switchTabs, !noBorder && $.border,dark && $.dark)

    return (
      <div className={className}>
        <div className={$.inner}>
          {tabs.map(({code, title}) => (
            <div key={code} onClick={() => this._onTabClick(code)} className={cx($.tab, active === code && $.activeTab)}>
              {title}
            </div>
          ))}
        </div>
      </div>
    )
  }

  _onTabClick = (code) => {
    const {active, onSwitch} = this.props

    if(code !== active) {
      onSwitch && onSwitch(code)
    }
  }
}

export default SwitchTabs
