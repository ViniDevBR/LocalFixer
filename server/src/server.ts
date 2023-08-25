import express from 'express'
import mongoose from 'mongoose'
//ROUTERS
import { userRouter } from './controllers/auth'
import { ordersRouter } from './controllers/orders'


export const app = express()

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = 5555

    app.use(express.json())
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')

      next()
    })

    app.use('/auth', userRouter)
    app.use('/orders', ordersRouter)

    app.listen(port, () => {
      console.log('SERVER ONLINE 🚀🔥')
    })
  })
  .catch(() => console.log('MONGO FALHOU'))
