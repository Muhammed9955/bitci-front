import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const header = css`
  display: flex;
  align-items: stretch;
  
  & > * {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  
  & > *:first-child {
    padding-left: 0;
  }
  
  & > *:last-child {
    padding-right: 0;
  }
  
  & > *:not(:first-child) {
    border-left: 1px solid ${colors.darkGray}; 
  }
`