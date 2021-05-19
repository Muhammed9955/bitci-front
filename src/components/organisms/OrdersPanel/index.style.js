import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const statusIco = css`
  width: 16px;
`

export const actions = css`
  display: flex;
  align-items: center;
  
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`

export const activeTab = css`
  color: ${colors.white};
`

export const tab = css`
  padding: 10px 0;
  cursor: pointer;
  
  &:not(:first-child) {
    margin-left: 10px;
  }
`

export const tabs = css`
  font-size: 16px;
  font-weight: 300;
  color: ${colors.gray};
  display: flex;
  justify-content: flex-start !important;
`

export const noOrdersTip = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.gray};
  font-size: 16px;
  font-weight: 200;
`

export const ordersPanel = css`
  display: flex;
  flex-direction: column;
  flex: 226 226 226px;
  overflow: auto;
`

export const table = css`
  flex: 1;
  max-height: unset;
`