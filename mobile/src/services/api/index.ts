import { API } from '..'

export async function getOSList() {
  const { data } = await API.get('/')

  return data
}