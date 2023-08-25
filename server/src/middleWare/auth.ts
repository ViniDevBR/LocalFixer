import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../app/config/auth.json'


interface JwtPayload {
  _id: string
  iat: number
  exp: number
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ message: 'O TOKEN NÃO FOI INFORMMADO' })
    }

    const verifyTypeToken = authHeader.split(' ')

    if (verifyTypeToken.length !== 2) {
      return res.status(401).send({ message: 'ERRO NO TOKEN' })
    }

    const [type, token] = verifyTypeToken

    if (!/^Bearer$/i.test(type)) {
      return res.status(401).send({ message: 'TIPO DE TOKEN INCORRETO' })
    }

    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'TOKEN INVALIDO' })
      }
      const decode = decoded as JwtPayload | undefined

      if (decode) {
        req.body.userId = decode._id
        return next()
      }
    })

  } catch (error) {
    console.log(error)
  }
}
