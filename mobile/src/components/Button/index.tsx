import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { Text } from '../Text'
import { ButtonContainer } from './styles'


interface IProps extends TouchableOpacityProps {
  title: string
  isLoading: boolean
  variant?: 'secondary' | 'terciary' | 'disable'
}

export function Button({ title, isLoading, variant, ...props }: IProps) {
  return (
    <ButtonContainer {...props} variant={variant}>
      {isLoading ? 
        <ActivityIndicator size='large' color='#F3F3F3'/> 
        :
        <Text 
          size={18} 
          weight='Bold' 
          color={variant === 'disable' ? 'PRIMARY' : 'TEXT_1'}
        >
          {title}
        </Text>
      }
    </ButtonContainer>
  )
}