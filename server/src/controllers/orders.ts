//EXPRESS & NODE
import { Router } from 'express'
import { authMiddleware } from '../middleWare/auth'


export const ordersRouter = Router()

ordersRouter.use(authMiddleware)

ordersRouter.get('/main', async (req, res) => {
  res.send({ message: 'TOKEN JA RODANDO' })
})
