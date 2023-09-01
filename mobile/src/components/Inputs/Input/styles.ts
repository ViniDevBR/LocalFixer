import styled, { css } from 'styled-components/native'

interface Props {
  isFocused: boolean
}

export const InputContainer = styled.View<Props>`
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_100};

  ${({ isFocused }) => isFocused && css`
    border-color: ${props => props.theme.COLORS.GRAY_500};
  `};
`

export const IconContainer = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: transparent;
`

export const InputText = styled.TextInput<Props>`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.TEXT};
  background-color: transparent;
`