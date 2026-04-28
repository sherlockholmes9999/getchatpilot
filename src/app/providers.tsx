import { SessionProvider } from 'next-auth/react'
import { PusherProvider } from '@/lib/pusher/provider'

export function Providers({ children, session, userId }: { 
  children: React.ReactNode
  session: any
  userId?: string
}) {
  return (
    <SessionProvider session={session}>
      {userId ? (
        <PusherProvider userId={userId}>
          {children}
        </PusherProvider>
      ) : (
        children
      )}
    </SessionProvider>
  )
}