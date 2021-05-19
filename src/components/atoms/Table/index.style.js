import {css} from 'react-emotion'

import theme from 'theme'

const {colors} = theme

export const cell = css`
  font-size: 11px;
  font-weight: 600;
  text-align: left;
  color: ${colors.white};
  display: flex;
  align-items: center;
`

export const header = css`
  font-size: 11px;
  font-weight: 600;
  text-align: left;
  color: ${colors.gray};
`

export const table = css`
  width: 100%;
  
  .ReactTable {
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    
    .rt-thead.-header {
      box-shadow: none;
    }
  
    .rt-tbody, .rt-thead {
      .rt-table, .rt-th, .rt-td, .rt-tr-group {
        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 0;
        border-left-width: 0;
      }
    }
  }
`