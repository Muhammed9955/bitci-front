import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const chartContainer = css`
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
  padding: 0 1px 1px 0;
`

export const charts = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1px 0 0 1px;
`

export const header = css`
  background: ${colors.background};
  display: flex;
  justify-content: center;
`

export const sm = css`
  .${chartContainer} {
    flex-basis: 50%;
  }
  
  @media (max-width: 768px) {
    .${chartContainer} {
      flex-basis: 100%;
    }
  }
`

export const tickersGrid = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #E7F7F7;
  
  @media (max-width: 768px) {
    .${chartContainer} {
      flex-basis: 50%;
    }
  }
`