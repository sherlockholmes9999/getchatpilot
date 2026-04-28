'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Channel } from 'pusher-js'

interface PusherContextValue {
  channel: Channel | null
  isConnected: boolean
}

const PusherContext = createContext<PusherContextValue>({
  channel: null,
  isConnected: false,
})

export function PusherProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  const [channel, setChannel] = useState<Channel | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!userId) return

    const PusherJS = require('pusher-js')
    
    const pusher = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
    })

    const newChannel = pusher.subscribe(`user-${userId}`)

    newChannel.bind('pusher:subscription_succeeded', () => {
      setIsConnected(true)
    })

    newChannel.bind('pusher:subscription_error', () => {
      setIsConnected(false)
    })

    setChannel(newChannel)

    return () => {
      newChannel.unbind_all()
      pusher.unsubscribe(`user-${userId}`)
    }
  }, [userId])

  return (
    <PusherContext.Provider value={{ channel, isConnected }}>
      {children}
    </PusherContext.Provider>
  )
}

export function usePusher() {
  return useContext(PusherContext)
}