//REACT
import { useEffect, useState } from 'react'
//HOOKS
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components/native'
import { useToken } from '@/hooks/useToken'
//YUP
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//TYPES
import { ExpoPushToken } from 'expo-notifications'
import { LocationObject } from 'expo-location'
//BACK END & UTILS
import { Login } from '@/services/api'
import { registerForPushNotificationsAsync } from '@/utils/pushToken'
//LOCATION
import * as Location from 'expo-location'
//TOAST
import Toast from 'react-native-toast-message'



export type IFormData = yup.InferType<typeof schema>

const defaultForm: IFormData = {
  email: '',
  password: ''
}

const schema = yup.object({
  email: yup
    .string()
    .email('Este e-mail esta correto?')
    .required('Email é obrigatório!')
    .lowercase()
    .trim(),
  password: yup
    .string()
    .min(6, 'Não esta faltando alguma coisa?')
    .required('Campo Obrigatório')
    .trim()
}).required()

export function useLogin() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true)
  const [pushToken, setPushToken] = useState<ExpoPushToken | undefined>(undefined)
  const [location, setLocation] = useState<LocationObject>({} as LocationObject)

  const { COLORS } = useTheme()
  const { updateToken, updatePosition } = useToken()

  const { 
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<IFormData>({
    defaultValues: defaultForm,
    resolver: yupResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })

  async function onSubmit(dataForm: IFormData) {
    try {
      const { data, status } = await Login({
        email: dataForm.email,
        password: dataForm.password,
        pushToken: pushToken?.data ? pushToken.data : '',
        localization: {
          altitude: location.coords.altitude ? location.coords.altitude : 0,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          timestamp: location.timestamp.toString()
        }
      })

      if (status === 200) {
        updateToken(data.token)
        updatePosition(data.position)
        Toast.show({
          type: 'success',
          text1: 'Bem vindo 👏',
          text2: 'Feliz em te ver aqui',
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'ERRO',
      })
      console.log(error)
    } finally {
      reset()
    }
  }
  function handlePasswordVisible() {
    setPasswordVisible(prev => !prev)
  }
  async function getPushToken() {
    const pushToken = await registerForPushNotificationsAsync()

    setPushToken(pushToken)
  }
  async function getPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    getPushToken() 
    getPermissions()
  },[])
 

  
  return {
    COLORS,
    errors,
    control,
    isSubmitting,
    passwordVisible,
    handlePasswordVisible,
    handleSubmit,
    onSubmit,
  }
}