import { createContext, ReactNode, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'


interface IContext {
  token: string
  updateToken: (token: string) => void
  deleteToken: () => void
}
interface IProvider {
  children: ReactNode
}

const defaultValuesContext = {
  token: '',
  updateToken: () => {},
  deleteToken: () => {},
} satisfies IContext

export const TokenContext = createContext<IContext>(defaultValuesContext)

export function TokenProvider({ children }: IProvider) {
  const [token, setToken] = useState<string>('')

  async function updateToken(token: string) {
    setToken(token)
    await SecureStore.setItemAsync('localFixerToken', token)
  }

  async function deleteToken() {
    updateToken('')
  }

  async function verifyToken() {
    const data = await SecureStore.getItemAsync('localFixerToken')
    const dataResponse = data ? JSON.parse(data) : ''

    setToken(dataResponse)
  }

  useEffect(() => {
    verifyToken()
  },[])

  const values = {
    token,
    updateToken,
    deleteToken
  }
  
  return (
    <TokenContext.Provider value={values}>
      {children}
    </TokenContext.Provider>
  )
}