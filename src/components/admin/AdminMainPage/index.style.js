import {css} from 'react-emotion'


export const links = css`
  display: flex;
  flex-direction: column;
  
  & > *:not(:first-child) {
    margin-top: 10px;
  }
`