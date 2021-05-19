import {css} from 'react-emotion'

import theme from 'theme'


export const topMenu = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background: ${theme.colors.background};
  min-height: 55px;
`

export const logo = css`
  img {
    width: 26px;
  }
`

export const content = css`
  font-size: 18px;
  font-weight: 200;
  color: ${theme.colors.white};
`

export const search = css`
  img {
    width: 20px;
    margin-bottom: 5px;
  }
`