import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { LayoutChangeEvent, View } from 'react-native'
import { useTheme } from 'styled-components'

interface IRoute {
  onLayout: (event: LayoutChangeEvent) => void
}

export function Routes({ onLayout }: IRoute) {
  const { COLORS } = useTheme()

  return (
    <View onLayout={onLayout} style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}