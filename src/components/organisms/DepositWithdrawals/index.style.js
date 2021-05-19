import {css} from 'react-emotion'


export const currencyIco = css`
  width: 14px;
  height: 14px;
  margin-right: 14px;
  vertical-align: sub;
  
  &:not([src]) {
    opacity: 0;
  }
`