import * as Pusher from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || 'mt1',
  useTLS: true,
})

export const pusherClient =
  typeof window !== 'undefined'
    ? new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
      })
    : null

export async function triggerHandoverNotification(
  userId: string,
  chatId: string,
  phone: string
) {
  await pusherServer.trigger(`user-${userId}`, 'handover-request', {
    chatId,
    phone,
    timestamp: new Date().toISOString(),
  })
}

export async function sendNewMessageNotification(
  userId: string,
  message: { id: string; text: string; from: string }
) {
  await pusherServer.trigger(`user-${userId}`, 'new-message', message)
}

export async function sendInstanceStatusUpdate(
  userId: string,
  instanceName: string,
  status: string
) {
  await pusherServer.trigger(`user-${userId}`, 'instance-status', {
    instanceName,
    status,
    timestamp: new Date().toISOString(),
  })
}