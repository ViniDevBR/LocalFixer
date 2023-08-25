//EXPRESS & NODE
import { Router } from 'express'
import { registerUser } from '../app/useCases/user/register'
import { deleteUser } from '../app/useCases/user/deleteUser'
import { loginAuth } from '../app/useCases/user/loginAuth'
import { User } from '../app/models/User'


export const userRouter = Router()

userRouter.post('/register', registerUser)

userRouter.delete('/delete/:id', deleteUser)

userRouter.post('/login', loginAuth)

userRouter.get('/users', async (req, res) => {
  const allUsers = await User.find()

  res.send(allUsers)
})
