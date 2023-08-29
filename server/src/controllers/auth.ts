//EXPRESS & NODE
import { Router } from 'express'
import { registerUser } from '../app/useCases/user/register'
import { deleteUser } from '../app/useCases/user/deleteUser'
import { loginAuth } from '../app/useCases/user/loginAuth'
import { User } from '../app/models/User'
import { Expo, ExpoPushMessage, ExpoPushTicket, ExpoPushReceiptId, ExpoPushReceipt } from 'expo-server-sdk'


export const userRouter = Router()
const expo = new Expo()


userRouter.post('/register', registerUser)

userRouter.delete('/delete/:id', deleteUser)

userRouter.post('/login', loginAuth)

userRouter.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find()

    return res.send(allUsers)
  } catch (error) {
    console.log(error)
    return res.status(404).send({ message: 'ERRO' })
  }
})

userRouter.post('/notifications', async (req, res) => {
  try {
    const { token } = req.body
    console.log(token)
    res.status(200).send({ message: 'TOKEN ENVIADO' })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

userRouter.get('/notifications', async (req, res) => {
  try {
    const somePushTokens = ['ExponentPushToken[FKHhCjJgqPlURo_iTdDkZY]']
    const messages: ExpoPushMessage[] = []

    for (const pushToken of somePushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`)
        continue
      }

      messages.push({
        to: pushToken,
        sound: 'default',
        body: 'Verifique o app',
        title: 'Requisicao Disponivel !',
        data: { screenName: 'Requisicao' },
      })
    }

    const chunks = expo.chunkPushNotifications(messages)

  type ExpoPushTickets = ExpoPushTicket & {
    id: string
  }

  const tickets: ExpoPushTickets[] = [];
  (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk) as ExpoPushTickets[]
        console.log('ticketChunk -->', ticketChunk)
        tickets.push(...ticketChunk)
      } catch (error) {
        console.error(error)
      }
    }
  })()

  const receiptIds: ExpoPushReceiptId[] = []
  for (const ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  }

  type ExpoPushReceipts = ExpoPushReceipt & {
    message: string
  }
  type TReceipts = {
    [id: string]: ExpoPushReceipts
  }
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (const chunk of receiptIdChunks) {
      try {
        const receipts =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await expo.getPushNotificationReceiptsAsync(chunk) as TReceipts
        console.log('receipts -->', receipts)

        for (const receiptId in receipts) {
          const { status, details, message } = receipts[receiptId]
          if (status === 'ok') {
            continue
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`
            )
            if (details && details.error) {
              console.error(`The error code is ${details.error}`)
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  })()

  return res.status(200).send({ message: 'NOTIFICAÇÃO ENVIADA' })
  } catch (error) {
    console.log(error)
  }

})
