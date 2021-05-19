import React from 'react'
import styled, {css} from 'react-emotion'
import cs from 'classnames'

import theme from 'theme'

const toggle = css`
  display: flex;
  color: ${theme.colors.gray};
  align-items: center;
`

const toggleSm = css`
  & > span {
    font-size: 10px;
    line-height: 10px;
  }
`

const SliderContainer = styled.div`
  width: ${({sm}) => sm ? '24px' : '34px'};
  height: ${({sm}) => sm ? '10px' : '14px'};
  background: ${({theme, active, color = 'cyan'}) => active ? theme.colors[color] : theme.colors.darkGray};
  position: relative;
  border-radius: 7px;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
`

const Slider = styled.div`
  position: absolute;
  background: ${({theme, active}) => active ? theme.colors.lightCyan : theme.colors.gray};
  border-radius: 50%;
  width: ${({sm}) => sm ? '14px' : '20px'};
  height: ${({sm}) => sm ? '14px' : '20px'};
  left: ${({active}) => active ? 'calc(100% - 7px)' : '7px'};
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left .3s ease-out;
`

const Toggle = ({active, onChange, label, sm}) => (
  <div className={cs(toggle, {[toggleSm]: sm})}>
    <SliderContainer active={active} onClick={onChange && (() => onChange(!active))} sm={sm}>
      <Slider active={active} sm={sm}/>
    </SliderContainer>
    {label && <span>{label}</span>}
  </div>
)
export default Toggle