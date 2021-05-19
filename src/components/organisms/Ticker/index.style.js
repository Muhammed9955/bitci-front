import {css} from 'react-emotion'


export const currencyIco = css`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  vertical-align: bottom;
  
  &:not([src]) {
    opacity: 0;
  }
`