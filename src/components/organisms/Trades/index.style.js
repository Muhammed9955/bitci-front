import {css} from 'react-emotion'


export const trades = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const content = css`
  display: flex;
  flex: 1;
  padding: 0 15px;
`

export const side = css`
  overflow: auto;
  padding: 10px 0;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  max-width: 50%;
  
  &:first-child {
    margin-right: 15px;
  }
  
  & > *:not(:first-child) {
    margin-top: 5px;
  }
  
  &::-webkit-scrollbar {
      width: 0;
  }
`