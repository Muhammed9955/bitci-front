import {css} from 'react-emotion'

import theme from 'theme'


export const bid = css`
  color: ${theme.colors.green};
`

export const ask = css`
  color: ${theme.colors.red};
`

export const labels = css`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.gray};
  padding: 3px 0 1px;
`

export const inner = css`
  display: flex;
  flex-direction: column;
`

export const depthChart = css`
  a[href][title] {
    display: none !important;
  }
`
