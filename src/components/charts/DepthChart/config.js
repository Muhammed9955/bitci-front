import theme from 'theme'


const getGraphs = (mobile) => {
  return [{
    id: 'bids',
    fillAlphas: 0.1,
    lineAlpha: 1,
    lineThickness: 2,
    lineColor: mobile ? theme.colors.green : '#0f0',
    type: 'step',
    valueField: 'bidstotalvolume',
    balloonFunction: balloon,
  }, {
    id: 'asks',
    fillAlphas: 0.1,
    lineAlpha: 1,
    lineThickness: 2,
    lineColor: mobile ? theme.colors.red : '#f00',
    type: 'step',
    valueField: 'askstotalvolume',
    balloonFunction: balloon,
  }, {
    lineAlpha: 0,
    fillAlphas: 0.2,
    lineColor: '#000',
    type: 'column',
    clustered: false,
    valueField: 'bidsvolume',
    showBalloon: false,
  }, {
    lineAlpha: 0,
    fillAlphas: 0.2,
    lineColor: '#000',
    type: 'column',
    clustered: false,
    valueField: 'asksvolume',
    showBalloon: false,
  }]
}

const getCategoryAxis = (mobile, pair) => {
  return {
    title: mobile ? '' : `Price (${pair})`,
    offset: mobile ? -10 : 0,
    minHorizontalGap: 100,
    startOnAxis: true,
    showFirstLabel: false,
    showLastLabel: false,
    axisAlpha: mobile ? 0 : .3,
    gridAlpha: mobile ? 0 : .1,
  }
}

const getValueAxes = (mobile) => {
  return [{
    title: mobile ? '' : 'Volume',
    offset: mobile ? -30 : 0,
    axisAlpha: mobile ? 0 : .3,
    gridAlpha: mobile ? 0 : .1,
    unitPosition: 'right',
  }]
}


export const getDesktopConfig = (pair) => ({
  type: 'serial',
  theme: 'dark',
  graphs: getGraphs(),
  categoryField: 'value',
  chartCursor: {},
  balloon: {
    textAlign: 'left',
  },
  valueAxes: getValueAxes(),
  categoryAxis: getCategoryAxis(false, pair),
  export: {
    enabled: false,
  },
})

export const getMobileConfig = (pair) => ({
  ...getDesktopConfig(pair),
  graphs: getGraphs(true),
  categoryAxis: getCategoryAxis(true),
  valueAxes: getValueAxes(true),
  marginTop: 0,
  marginRight: 0,
  marginBottom: 20,
  marginLeft: 0,
  autoMargins: false,
  color: theme.colors.gray,
})

function balloon(item, graph) {
  var txt
  if (graph.id == 'asks') {
    txt = 'Ask: <strong>' + formatNumber(item.dataContext.value, graph.chart, 4) + '</strong><br />'
      + 'Total volume: <strong>' + formatNumber(item.dataContext.askstotalvolume, graph.chart, 4) + '</strong><br />'
      + 'Volume: <strong>' + formatNumber(item.dataContext.asksvolume, graph.chart, 4) + '</strong>'
  }
  else {
    txt = 'Bid: <strong>' + formatNumber(item.dataContext.value, graph.chart, 4) + '</strong><br />'
      + 'Total volume: <strong>' + formatNumber(item.dataContext.bidstotalvolume, graph.chart, 4) + '</strong><br />'
      + 'Volume: <strong>' + formatNumber(item.dataContext.bidsvolume, graph.chart, 4) + '</strong>'
  }
  return txt
}

function formatNumber(val, chart, precision) {
  return window.AmCharts.formatNumber(
    val,
    {
      precision: precision ? precision : chart.precision,
      decimalSeparator: chart.decimalSeparator,
      thousandsSeparator: chart.thousandsSeparator,
    },
  )
}