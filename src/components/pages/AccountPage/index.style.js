import {css} from 'react-emotion'

import theme from 'theme'


const {breakPoints} = theme

export const logout = css`
  flex: 1;
`

export const logoutContainer = css`
  display: flex;
  justify-content: stretch;
  padding: 0 20px;
`

export const container = css`
  flex: 0 0;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    flex-basis: 100%;
  }
`

export const sideContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const accountPage = css`
  background: ${theme.colors.dark};
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  overflow: auto;
  max-height: 100%;
  
  @media (max-width: ${breakPoints.mobile.max}px) {
    padding: 0 0 130px;
  }
`