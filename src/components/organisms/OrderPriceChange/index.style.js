import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const minPriceTip = css`
  text-align: right;
  font-size: 10px;
  font-weight: 200;
  color: ${colors.gray}; 
`

export const orderPriceChange = css`
  padding: 15px;
  display: flex;
  flex-direction: column;
  
  & > *:not(:first-child) {
    margin-top: 10px;
    
    &.${minPriceTip} {
      margin-top: 5px;
    }
  }
`
