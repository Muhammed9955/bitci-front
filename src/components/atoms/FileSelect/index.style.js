import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const file = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  color: ${colors.white};
  
  img {
    cursor: pointer;
    height: 12px;
    margin-left: 5px;
  }
`

export const list = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const actions = css`
  display: flex;
  margin: 0 0 0 10px;
  
  & > *:not(:first-child) {
    margin-left: 10px;
  }
`

export const tip = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.gray};
`

export const inputFile = css`
  display: none;
`

export const multiple = css`
  flex-direction: column;
  
  .${actions} {
    margin: 10px 0 0;
  }
`

export const fileSelect = css`
  display: flex;
  flex-direction: row;
  font-size: 12px;
`