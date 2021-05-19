import {css} from 'react-emotion'

import theme from 'theme'

const {colors} = theme

export const header = css`
  background: ${colors.dark};
  padding: 15px;
`

export const bottomMenu = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.background};
`