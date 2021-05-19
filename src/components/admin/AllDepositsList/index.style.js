import {css} from 'react-emotion'

import theme from 'theme'


const {colors} = theme

export const trueText = css`
  color: ${colors.green} !important;
`

export const falseText = css`
  color: ${colors.red} !important;
`