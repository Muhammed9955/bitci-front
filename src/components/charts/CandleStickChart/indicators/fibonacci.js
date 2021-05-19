import React from 'react'
import {BarSeries} from 'react-stockcharts/lib/series'
import {FibonacciRetracement, DrawingObjectSelector} from 'react-stockcharts/lib/interactive'
import {isNotDefined, isDefined, toObject} from 'react-stockcharts/lib/utils'

import {ema12, ema26, smaVolume50, GREEN_COLOR_A} from '../constants'
import Container from '../views/container'


const appearance = {
  ...FibonacciRetracement.defaultProps.appearance,
  fontFill: '#a3a9a9',
  stroke: '#a3a9a9',
  nsEdgeFill: '#a3a9a9',
}

class Fibonacci extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enableFib: true,
      retracements_1: [],
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyPress)
  }

  render() {
    const {
      history,
      height,
      showOrders,
    } = this.props

    const calculatedData = smaVolume50(ema12(ema26(history)))

    const candlesChartChildren = [
      <FibonacciRetracement appearance={appearance}
                            ref={this.saveInteractiveNodes('FibonacciRetracement', 1)}
                            enabled={this.state.enableFib}
                            retracements={this.state.retracements_1}
                            onComplete={this.onFibComplete1}/>,
    ]

    return (
      <Container onRef={this.saveCanvasNode}
                 showOrders={showOrders}
                 height={height}
                 candlesChartChildren={candlesChartChildren}
                 calculatedData={calculatedData}>

        <DrawingObjectSelector
          enabled={!this.state.enableFib}
          getInteractiveNodes={this.getInteractiveNodes}
          drawingObjectMap={{
            FibonacciRetracement: 'retracements',
          }}
          onSelect={this.handleSelection}
        />

      </Container>
    )
  }

  saveInteractiveNodes = (type, chartId) => {
    return node => {
      if (isNotDefined(this.interactiveNodes)) {
        this.interactiveNodes = {}
      }
      const key = `${type}_${chartId}`
      if (isDefined(node) || isDefined(this.interactiveNodes[key])) {
        // console.error(node, key)
        // console.log(this.interactiveNodes)
        // eslint-disable-next-line fp/no-mutation
        this.interactiveNodes = {
          ...this.interactiveNodes,
          [key]: {type, chartId, node},
        }
      }
    }
  }

  getInteractiveNodes = () => {
    return this.interactiveNodes
  }

  onKeyPress = (e) => {
    const keyCode = e.which
    switch (keyCode) {
      case 46: { // DEL
        const retracements_1 = this.state.retracements_1
          .filter(each => !each.selected)

        this.canvasNode.cancelDrag()
        this.setState({
          retracements_1,
        })
        break
      }
      case 27: { // ESC
        this.canvasNode.cancelDrag()
        this.node_1.terminate()
        // this.node_3.terminate();
        this.setState({
          enableFib: false,
        })
        break
      }
      case 68:   // D - Draw Fib
      case 69: { // E - Enable Fib
        this.setState({
          enableFib: true,
        })
        break
      }
    }
  }

  onFibComplete1 = (retracements_1) => {
    this.setState({
      retracements_1,
      enableFib: false,
    })
  }

  handleSelection = (interactives) => {
    const state = toObject(interactives, each => {
      return [
        `retracements_${each.chartId}`,
        each.objects,
      ]
    })
    this.setState(state)
  }

  saveCanvasNode = (node) => {
    this.canvasNode = node
  }
}


export default Fibonacci