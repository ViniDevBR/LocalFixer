import styled, { DefaultTheme } from 'styled-components/native'

interface TextProps {
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: keyof DefaultTheme['COLORS']
  size?: number
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) => weight ? `Inter_${weight}` : 'Inter_400'};
  color: ${({ theme, color }) => color ? theme.COLORS[color] : theme.COLORS.TEXT_1};
  font-size: ${({ size }) => size ? `${size}px` : '16px'};
`
