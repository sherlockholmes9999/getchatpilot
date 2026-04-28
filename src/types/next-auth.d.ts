import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    plan: 'TRIAL' | 'PRO' | 'ENTERPRISE'
    credits: number
    aiEnabled: boolean
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      plan: 'TRIAL' | 'PRO' | 'ENTERPRISE'
      credits: number
      aiEnabled: boolean
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
  }
}