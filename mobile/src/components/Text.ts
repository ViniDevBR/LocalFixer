import styled, { DefaultTheme } from 'styled-components/native'

interface TextProps {
  weight?:  keyof DefaultTheme['WEIGHT']
  color?: keyof DefaultTheme['COLORS']
  size?: number
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ theme, weight }) => weight ? `Inter_${theme.WEIGHT[weight]}` : 'Inter_400'};
  color: ${({ theme, color }) => color ? theme.COLORS[color] : theme.COLORS.TEXT};
  font-size: ${({ size }) => size ? `${size}px` : '16px'};
`
