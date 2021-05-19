import React from 'react'
import StraightLine from 'react-stockcharts/lib/interactive/components/StraightLine'
import {PriceCoordinate} from 'react-stockcharts/lib/coordinates'
import {format} from 'd3-format'


class Price extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHover: false,
      dragPrice: null,
    }

    this.dragStartPrice = null
  }

  render() {
    const {price, color, format, ...props} = this.props
    const {isHover, dragPrice} = this.state

    const shownPrice = typeof dragPrice !== 'number' ? price : dragPrice

    return (
      <g>
        <StraightLine {...props}
                      x1Value={0}
                      x2Value={1}
                      y1Value={shownPrice}
                      y2Value={shownPrice}
                      strokeWidth={isHover ? 3 : 1}
                      selected={isHover}
                      stroke={color}
                      strokeOpacity={1}
                      type="XLINE"
                      onDragStart={this._onDragStart}
                      onDrag={this._onDrag}
                      onDragComplete={this._onDragComplete}
                      onHover={this._handleHover}
                      onUnHover={this._handleHover}/>
        {isHover &&
        <PriceCoordinate at="right" orient="right" price={shownPrice} displayFormat={format} fill={color}/>}
      </g>
    )
  }

  _onDragStart = () => {
    const {price} = this.props

    this.setState({
      dragPrice: price,
    })

    this.dragStartPrice = price
  }

  _onDrag = (dragProps) => {
    const {chartConfig: {yScale}} = dragProps
    const {startPos, mouseXY} = dragProps

    const startY = yScale(this.dragStartPrice)

    const deltaY = startPos[1] - mouseXY[1]

    const invertPrice = yScale.invert(startY - deltaY)

    const newPrice = invertPrice < 0 ? 0 : invertPrice

    this.setState({
      dragPrice: newPrice,
    }, () => {
      const {onUpdate} = this.props
      onUpdate && onUpdate()
    })
  }

  _onDragComplete = () => {
    const {onChange} = this.props
    const newPrice = this.state.dragPrice

    this.setState({
      dragPrice: null,
    })

    this.dragStartPrice = null

    onChange && onChange(newPrice)
  }

  _handleHover = ({hovering}) => {
    if (this.state.isHover !== hovering) {
      this.setState({
        isHover: hovering,
      }, () => {
        const {onHoverChange} = this.props
        onHoverChange && onHoverChange(hovering)
      })
    }
  }
}

export default Price