import { createContext, ReactNode, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface IContext {
  token: string
  position: Position
  updatePosition: (position: Position) => void
  deletePosition: (position: null) => void
  updateToken: (token: string) => void
  deleteToken: () => void
}
interface IProvider {
  children: ReactNode
}
type Position = 'Analista' | 'Tecnico' | 'NULL'


const defaultValuesContext = {
  token: '',
  position: 'NULL',
  updateToken: () => {},
  deleteToken: () => {},
  deletePosition: () => {},
  updatePosition: () => {},
} satisfies IContext

export const TokenContext = createContext<IContext>(defaultValuesContext)

export function TokenProvider({ children }: IProvider) {
  const [token, setToken] = useState<string>('')
  const [position, setPosition] = useState<Position>('NULL')

  async function updateToken(token: string) {
    setToken(token)
    await SecureStore.setItemAsync('localFixerToken', token)
  }

  async function deleteToken() {
    updateToken('')
  }

  async function verifyInfos() {
    const [tokenAsync, positionAsync] = await Promise.all([
      SecureStore.getItemAsync('localFixerToken'),
      AsyncStorage.getItem('localFixerPosition')
    ])
   
    const tokenResponse = tokenAsync ? JSON.parse(tokenAsync) : ''
    const positionResponse = positionAsync ? JSON.parse(positionAsync) : 'NULL'

    setToken(tokenResponse)
    setPosition(positionResponse)
  }

  async function updatePosition(position: Position) {
    setPosition(position)
    await AsyncStorage.setItem('localFixerPosition', position)
  }

  async function deletePosition() {
    updatePosition('NULL')
  }

  useEffect(() => {
    verifyInfos()
  },[])

  const values = {
    token,
    position,
    updateToken,
    deleteToken,
    deletePosition,
    updatePosition
  }
  
  return (
    <TokenContext.Provider value={values}>
      {children}
    </TokenContext.Provider>
  )
}