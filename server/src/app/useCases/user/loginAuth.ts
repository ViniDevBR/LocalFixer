import { Response, Request } from 'express'
import { User } from '../../models/User'
import authConfig from '../../../app/config/auth.json'
import jwt from 'jsonwebtoken'


export async function loginAuth(req: Request, res: Response) {
  try {
    const {
      password,
      email,
      pushToken,
      localization
    } = req.body

    const userEmail = await User.findOne({ email })

    if (!userEmail) {
      res.status(404).send({
        message: 'USUARIO NÃO EXISTE'
      })
    }

    const userPassword = await User.findOne({ password })

    if (!userPassword) {
      res.status(404).send({
        message: 'SENHA INCORRETA'
      })
    }

    await User.findByIdAndUpdate(userEmail?._id, {
      pushToken,
      localization
    })

    const token = jwt.sign({ _id: userEmail?._id }, authConfig.secret, {
      expiresIn: 2592000000 // 1 MES
    })

    res.status(200).send({ name: userEmail?.name, token, position: userEmail?.position })

  } catch (error) {
    res.status(400).send({ message: 'ERRO AO LOGAR' })
    console.log(error)
  }
}
