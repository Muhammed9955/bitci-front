import {bollingerBand, ema, macd, sar, sma} from 'react-stockcharts/lib/indicator/index'


export const GREEN_COLOR = '#03e603'
export const GREEN_COLOR_A = 'rgba(3, 230, 3, 0.1)'
export const RED_COLOR = '#ff0002'
export const RED_COLOR_A = 'rgba(255, 0, 2, 0.1)'

export const IS = {
  MOV_AVG: 'movingAverage',
  BOL_BND: 'bollingerBand',
  SAR: 'sar',
  VOL_PROF: 'volumeProfile',
  VOL_PROF_S: 'volumeProfileSession',
  MACD: 'macd',
  FIBO: 'fibonacci',
}
export const INDICATORS_LIST = Object.values(IS).concat(null)

export const accelerationFactor = .02;
export const maxAccelerationFactor = .2;
export const sarLabel = `SAR (${accelerationFactor}, ${maxAccelerationFactor})`
export const dSar = sar()
  .options({
    accelerationFactor, maxAccelerationFactor
  })
  .merge((d, c) => {d.sar = c;})
  .accessor(d => d.sar);

export const ema26 = ema()
  .id(0)
  .options({windowSize: 26})
  .merge((d, c) => {
    d.ema26 = c
  })
  .accessor(d => d.ema26)

export const ema12 = ema()
  .id(1)
  .options({windowSize: 12})
  .merge((d, c) => {
    d.ema12 = c
  })
  .accessor(d => d.ema12)

export const macdCalc = macd()
  .options({
    fast: 12,
    slow: 26,
    signal: 9,
  })
  .merge((d, c) => {
    d.macd = c
  })
  .accessor(d => d.macd)
export const macdAppearance = {
  stroke: {
    macd: RED_COLOR,
    signal: GREEN_COLOR,
  },
  fill: {
    divergence: "#4682B4"
  },
};

export const smaVolume50 = sma()
  .id(3)
  .options({
    windowSize: 50,
    sourcePath: 'volume',
  })
  .merge((d, c) => {
    d.smaVolume50 = c
  })
  .accessor(d => d.smaVolume50)
// .stroke('blue') // Optional

export const bb = bollingerBand()
  .merge((d, c) => {d.bb = c;})
  .accessor(d => d.bb);

export const bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00",
};

export const bbFill = "#4682B4";