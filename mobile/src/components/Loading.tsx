import { View, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'


interface ILoading {
  transparent?: boolean
}

export function Loading({ transparent }: ILoading) {
  const { COLORS } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: transparent ? '' : COLORS.BACKGROUND
      }}
    >
      <ActivityIndicator size='large' color={COLORS.GRAY_500}/>
    </View>
  )
}
