import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import * as Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || 'mt1',
  useTLS: true,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, event, channel, data } = body

    if (!userId || !event || !channel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await pusher.trigger(`user-${userId}`, event, data)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Pusher trigger error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}