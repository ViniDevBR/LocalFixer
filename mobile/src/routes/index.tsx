//REACT
import { LayoutChangeEvent, View } from 'react-native'
//HOOKS
import { useTheme } from 'styled-components'
import { useToken } from '@/hooks/useToken'
//NAVIGATION
import { NavigationContainer } from '@react-navigation/native'
import { TecnicoRoutes } from './tec.routes'
//SCREENS
import { Login } from '@/screens/Login'


interface IRoute {
  onLayout: (event: LayoutChangeEvent) => void
}

export function Routes({ onLayout }: IRoute) {
  const { COLORS } = useTheme()
  const { token, position } = useToken()

  function verifyUser() {
    if (token === '') {
      return <Login />
    }

    return position === 'Analista' ? <TecnicoRoutes /> : <TecnicoRoutes />
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
      <NavigationContainer>
        {verifyUser()}
      </NavigationContainer>
    </View>
  )
}