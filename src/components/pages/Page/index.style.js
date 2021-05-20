import {css} from 'react-emotion'

import theme from 'theme'


export const page = css`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 40px;
  margin-right: auto;
  margin-left: auto;
  flex: 1;
  
  @media(max-width: ${theme.breakPoints.mobile.max}px) {
    padding: 0 0 65px;
    background: ${theme.colors.dark};
    display: flex;
    flex-direction: column;
  }
`