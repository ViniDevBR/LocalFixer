import express from 'express'
import mongoose from 'mongoose'
import { router } from './router'

const app = express()

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = 5555

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')

      next()
    })

    app.use(express.json())
    app.use(router)

    app.listen(port, () => {
      console.log('SERVER ONLINE 🚀🔥')
    })
  })
  .catch(() => console.log('MONGO FALHOU'))
