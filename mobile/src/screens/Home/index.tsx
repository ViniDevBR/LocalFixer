import { View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Text } from '../../components/Text'

export function Home() {
  const { COLORS } = useTheme()
  
  return (
    <View>
      <Text color='GRAY_500'>
        fdshuifr
      </Text>
    </View>
  )
}