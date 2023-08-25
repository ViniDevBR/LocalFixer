import { User } from '../../models/User'
import { Request, Response } from 'express'


export async function registerUser(req: Request, res: Response) {
  try {
    const {
      name,
      password,
      pushToken,
      email,
      localization,
      position
    } = req.body

    const create = await User.create({
      name,
      localization,
      password,
      pushToken,
      email,
      position
    })

    return res.status(201).json(create)

  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'ERRO AO CRIAR USUARIO' })
  }
}
