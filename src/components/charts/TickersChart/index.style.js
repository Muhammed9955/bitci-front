import {css} from 'react-emotion'

import theme from 'theme'


const {colors, breakPoints} = theme

export const arrow = css`
  height: 5px;
  width: 5px;
  border: 5px solid transparent;
  display: inline-block;
  margin-right: 7px;
`

export const up = css`
  border-bottom: 5px solid ${theme.colors.green};
  vertical-align: baseline;
`

export const down = css`
  border-top: 5px solid ${theme.colors.red};
  vertical-align: middle;
`

export const percent = css`
  font-size: 14px;
  color: ${colors.gray};
`

export const green = css`
  &.${percent} {
    color: ${colors.green};
  }
`

export const red = css`
  &.${percent} {
    color: ${colors.red};
  }
`

export const svgContainer = css`
  flex: 1 0;
  display: flex;
  flex-direction: column;
`

export const change = css`
  flex-basis: 94px;
`

export const bottom = css`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  @media (max-width: ${breakPoints.mobile.max}px) {
    margin-top: 0px;
    flex-direction: column;
    align-items: flex-start;
    .${change} {
      flex-basis: auto;
    }
  }
`

export const price = css`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.gray};
  @media (max-width: ${breakPoints.mobile.max}px) {
    font-size: 14px;
  }
`

export const firstCurrency = css`
  font-size: 18px;
  font-weight: 200;
  color: ${colors.gray};
`

export const tickersChart = css`
  padding: 20px 15px 12px;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
`