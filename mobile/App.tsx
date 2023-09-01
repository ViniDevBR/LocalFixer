//REACT
import { useCallback } from 'react'
//EXPO
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Notifications from 'expo-notifications'
//PROVIDERS
import { ThemeProvider } from 'styled-components'
import { TokenProvider } from '@/context/tokenContext'
//USE APP
import light from '@/theme/light'
import { Routes } from '@/routes'
import { Loading } from '@/components/Loading'


SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_100: require('./src/assets/fonts/Inter-Thin.otf'),
    Inter_200: require('./src/assets/fonts/Inter-ExtraLight.otf'),
    Inter_300: require('./src/assets/fonts/Inter-Light.otf'),
    Inter_400: require('./src/assets/fonts/Inter-Regular.otf'),
    Inter_500: require('./src/assets/fonts/Inter-Medium.otf'),
    Inter_600: require('./src/assets/fonts/Inter-SemiBold.otf'),
    Inter_700: require('./src/assets/fonts/Inter-Bold.otf'),
    Inter_800: require('./src/assets/fonts/Inter-ExtraBold.otf'),
    Inter_900: require('./src/assets/fonts/Inter-Black.otf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])
  
  //console.log(fontsLoaded, fontError)
  return (
    <TokenProvider>
      <ThemeProvider theme={light}>
        <StatusBar style="auto" />
        {fontsLoaded ? <Routes onLayout={onLayoutRootView}/> : <Loading />}
      </ThemeProvider>
    </TokenProvider>
  )
}
