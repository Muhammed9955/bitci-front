import React from 'react'

import MiniPanel from 'components/atoms/MiniPanel'

import * as $ from './index.style'


class SwitchableMiniPanel extends React.Component {
  state = {switched: false}

  render() {
    const {label, ico, btnRender, title, desc, childrenRender} = this.props
    const {switched} = this.state

    return (
      <MiniPanel label={label}>
        {switched
          ? childrenRender(this._toggle)
          : (
            <div className={$.switchableMiniPanel}>
              <div className={$.info}>
                <div className={$.icoContainer}>
                  {ico}
                </div>
                <div className={$.textContainer}>
                  <span className={$.title}>{title}</span>
                  <span className={$.desc}>{desc}</span>
                </div>
              </div>
              <div className={$.actions}>
                {btnRender(this._toggle)}
              </div>
            </div>
          )
        }
      </MiniPanel>
    )
  }

  _toggle = () => {
    this.setState(
      ({switched}) => ({switched: !switched}),
      () => {
        const {onToggleClick} = this.props
        const {switched} = this.state

        onToggleClick && onToggleClick(switched)
      },
    )
  }
}


export default SwitchableMiniPanel