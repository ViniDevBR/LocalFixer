//REACT
import { 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, 
  ScrollView 
} from 'react-native'
//COMPONENTS
import { Text } from '@/components/Text'
import { Ionicons } from '@expo/vector-icons'
import { Input } from '@/components/Inputs'
import { Button } from '@/components/Button'
//STYLED COMPONENTS
import * as S from './styles'
//HOOKS
import { useLogin } from './useScreen'


// { route, navigation }: ScreenProps<'Login'>
export function Login() {
  const {
    COLORS,
    control,
    errors,
    passwordVisible,
    isSubmitting,
    handlePasswordVisible,
    handleSubmit,
    onSubmit,
  } = useLogin()

  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <S.SafeContainer>
        <ScrollView>
          <S.TitleContainer>
            <View>
              <Text size={24} weight='Light'>
                Olá
              </Text>
              <Text size={24} weight='Light'>
                Bem vindo ao
              </Text>
              <Text size={24} weight='Light'>
                Local<Text size={24} weight='Bold'>Fixer</Text>
              </Text>
            </View>

            <TouchableOpacity style={{ padding: 10, paddingRight: -5 }}>
              <Ionicons name="moon" size={24} color={COLORS.TEXT} />
            </TouchableOpacity>
          </S.TitleContainer>

          <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
            <Text>
              E-mail
            </Text>
            <Input 
              control={control}
              type='control' 
              keyboardType='email-address'
              name='email' 
              placeholder='user@email.com' 
              icon='user'
              error={errors.email}
            />

            <Text style={{ marginTop: 20 }}>
              Senha
            </Text>
            <Input 
              control={control}
              type='control'
              secureTextEntry={passwordVisible}
              onPress={handlePasswordVisible}
              name='password' 
              placeholder='********' 
              icon='eye'
              error={errors.password}
            />
          </View>

          <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
            <Button 
              title='Entrar' 
              onPress={handleSubmit(onSubmit)} 
              isLoading={isSubmitting} 
              disabled={isSubmitting}
            />
          </View>
        </ScrollView>
      </S.SafeContainer>
    </KeyboardAvoidingView>
  )
}