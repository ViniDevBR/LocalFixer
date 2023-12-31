import { Response, Request } from 'express'
import { User } from '../../models/User'


export async function deleteUser(req: Request, res: Response) {
  try {
    const {
      id
    } = req.params

    const response = await User.findByIdAndDelete(id)

    return res.send(response)
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'ERRO AO DELETAR USUARIO' })
  }
}
