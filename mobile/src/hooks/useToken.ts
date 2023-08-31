import { TokenContext } from '@/context/tokenContext'
import { useContext } from 'react'

export function useToken() {
  const context = useContext(TokenContext)

  return context
}