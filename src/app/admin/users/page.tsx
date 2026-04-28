'use client'

import { UserManagement } from '@/components/admin/user-management'
import { useState } from 'react'

interface AdminUser {
  id: string
  name: string
  email: string
  image?: string
  plan: 'TRIAL' | 'PRO' | 'ENTERPRISE'
  credits: number
  aiEnabled: boolean
  createdAt: Date
  _count: {
    instances: number
    contacts: number
  }
}

const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'PRO',
    credits: 5000,
    aiEnabled: true,
    createdAt: new Date(),
    _count: { instances: 2, contacts: 150 },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    plan: 'ENTERPRISE',
    credits: 25000,
    aiEnabled: true,
    createdAt: new Date(),
    _count: { instances: 5, contacts: 2500 },
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    plan: 'TRIAL',
    credits: 100,
    aiEnabled: false,
    createdAt: new Date(),
    _count: { instances: 1, contacts: 25 },
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      <UserManagement
        users={users}
        onUpdateUser={async (userId, data) => {
          setUsers(users.map(u => u.id === userId ? { ...u, ...data } : u))
        }}
        onDeleteUser={async (userId) => {
          setUsers(users.filter(u => u.id !== userId))
        }}
      />
    </div>
  )
}