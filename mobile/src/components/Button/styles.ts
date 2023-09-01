import styled, { css } from 'styled-components/native'

interface IButton {
  variant?: 'secondary' | 'terciary' | 'disable'
}

export const ButtonContainer = styled.TouchableOpacity<IButton>`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 16px;

  ${({ disabled }) => disabled && css`
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_DISABLED};
  `}
  ${({ variant }) => variant === 'disable' && css`
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_DISABLED};
  `}
  ${({ variant }) => variant === 'secondary' && css`
    background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  `}
  ${({ variant }) => variant === 'terciary' && css`
    background-color: ${({ theme }) => theme.COLORS.TERCIARY};
  `}
`