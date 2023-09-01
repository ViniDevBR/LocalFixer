import { ILogin } from '@/types/Login'
import { API } from '..'


export async function getOSList() {
  const { data } = await API.get('/')

  return data
}

export async function Login(formLogin: ILogin) {
  type IResponse = {
    name: string
    position: 'Analista' | 'Tecnico'
    token: string
  }

  const { data, status } = await API.post<IResponse>('/auth/login', formLogin)

  return { data, status }
}