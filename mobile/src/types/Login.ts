export interface ILogin {
  email: string 
  password: string 
  pushToken: string
  localization: ILocal
}

interface ILocal {
  altitude: number,
  longitude: number,
  latitude: number,
  timestamp: string
}