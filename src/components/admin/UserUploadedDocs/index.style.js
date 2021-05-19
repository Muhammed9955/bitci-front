import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const name = css`
  color: ${colors.lightGray};
  font-size: 14px;
  font-weight: 200;
  margin-bottom: 10px;
`

export const img = css`
  width: 100%;
`

export const doc = css`
  display: flex;
  flex-direction: column;
  flex: 0 0 25%;
  cursor: pointer;
  padding: 25px;
  
  &:hover {
    background: ${colors.darkGreen};
  }
`

export const noDocs = css`
  padding: 15px;
  color: ${colors.lightGray};
  font-size: 18px;
  font-weight: 600;
`

export const actions = css`
  padding: 15px;
`

export const docs = css`  
  display: flex;
  flex-wrap: wrap;
`

export const userUploadedDocs = css`  
  display: flex;
  flex-direction: column;
`