import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const link = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  font-weight: 200;
`

export const user = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: -20px;  
`

export const stateIco = css`
  height: 15px;
`

export const statusPanel = css`
  display: flex;
  justify-content: flex-end;
  
  padding-bottom: 10px;
  
  & > * {
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
`
