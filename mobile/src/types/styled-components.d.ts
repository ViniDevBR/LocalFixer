import 'styled-components/native'
import light from '../theme/light'

declare module 'styled-components/native' {
  type ThemeType = typeof light

  export interface DefaultTheme extends ThemeType {}
}
