import {css} from 'react-emotion'

import theme from 'theme'


export const incrementArea = css`
  padding: 5px 10px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight : 400;
  margin: 2px 0;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    text-align: left;
  }
`

export const incrementAreaGreen = css`
  background: ${theme.colors.halfGreen};
  color: ${theme.colors.green};
  border-top: 1px solid #325747;
  border-bottom: 1px solid #325747;
`

export const incrementAreaRed = css`
  background: ${theme.colors.halfRed};
  color: ${theme.colors.red};
  border-top: 1px solid #912928;
  border-bottom: 1px solid #912928;
`

export const orderBook = css`
  flex: 256 256 256px;
  display: flex;
  flex-direction: column; 
  overflow: hidden;
`

export const table = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    padding: 0;
  }
`

export const head = css`
  flex: 1;
  font-size: 12px;
  color: ${theme.colors.gray};
  white-space: nowrap;
  
  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    font-size: 13px;
  }
`

export const header = css`
  display: flex;
  padding-bottom: 4px;
  
  .${head}:nth-child(2):not(:last-child) {
    text-align: center;
  }
  
  .${head}:last-child {
    text-align: right;
  }
`

export const depthTableContainer = css`
  flex: 1 1 0;
  overflow: hidden;
`