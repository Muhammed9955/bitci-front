import React from 'react'
import numeral from 'numeral'


class NumberInput extends React.Component {
  state = {isFocused: false}

  render() {
    const {value, ...props} = this.props

    const formattedValue = this._format(value)

    return <input {...props}
                  value={formattedValue} onChange={this._onChange} onFocus={this._onFocus} onBlur={this._onBlur}/>
  }

  _onChange = ({target}) => {
    const {onChange} = this.props
    const {value} = target

    onChange && onChange(value)
  }

  _onFocus = () => this.setState({isFocused: true})

  _onBlur = () => this.setState({isFocused: false})

  _format = (value) => {
    const {isFocused} = this.state

    if(!value) return isFocused ? value : '0'

    const {format} = this.props
    const withoutChars = String(value).replace(/[^0-9\,\.]/g, '').replace(',', '.')

    if(!format) return withoutChars

    const formattedValue = numeral(Number(withoutChars)).format(format)

    return isFocused && withoutChars.length < formattedValue.length ? withoutChars : formattedValue
  }
}

export default NumberInput