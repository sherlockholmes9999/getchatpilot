'use client'

import { useEffect } from 'react'
import { DashboardStats } from '@/components/dashboard/stats'
import { InstanceManager } from '@/components/dashboard/instance-manager'
import { ChatList } from '@/components/dashboard/chat-list'
import { ChatWindow } from '@/components/chat/chat-window'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockStats = {
  totalContacts: 1250,
  activeChats: 48,
  messagesSent: 15420,
  messagesDelivered: 14890,
  messagesRead: 12500,
  failedMessages: 230,
  aiResponses: 8920,
  handovers: 127,
  credits: 2450,
}

const chartData = [
  { name: 'Mon', messages: 420, responses: 380 },
  { name: 'Tue', messages: 520, responses: 460 },
  { name: 'Wed', messages: 380, responses: 340 },
  { name: 'Thu', messages: 610, responses: 550 },
  { name: 'Fri', messages: 490, responses: 420 },
  { name: 'Sat', messages: 280, responses: 240 },
  { name: 'Sun', messages: 150, responses: 120 },
]

const mockChats = [
  { id: '1', name: 'John Doe', phone: '+1234567890', lastMessage: 'Thanks for your help!', unread: 2 },
  { id: '2', name: 'Jane Smith', phone: '+1987654321', lastMessage: 'When will the order arrive?', unread: 0 },
  { id: '3', name: 'Alice Johnson', phone: '+1122334455', lastMessage: 'I need assistance with my account', unread: 1 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your overview.</p>
      </div>

      <DashboardStats stats={mockStats} chartData={chartData} />

      <Tabs defaultValue="chats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chats">Active Chats</TabsTrigger>
          <TabsTrigger value="instances">Instances</TabsTrigger>
        </TabsList>

        <TabsContent value="chats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatList chats={mockChats} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardContent className="p-0">
                <ChatWindow
                  chatId="1"
                  chatName="John Doe"
                  phone="+1234567890"
                  messages={[
                    { id: '1', text: 'Hi, I need help with my order', fromMe: false, timestamp: new Date(), status: 'READ' },
                    { id: '2', text: 'Of course! I\'d be happy to help', fromMe: true, timestamp: new Date(), status: 'READ' },
                    { id: '3', text: 'Thanks for your help!', fromMe: false, timestamp: new Date(), status: 'DELIVERED' },
                  ]}
                  aiEnabled={true}
                  isHandoverActive={false}
                  onSendMessage={() => {}}
                  onToggleAI={() => {}}
                  onTakeover={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instances">
          <InstanceManager
            instances={[]}
            userId=""
            onCreate={async () => {}}
            onConnect={async () => {}}
            onLogout={async () => {}}
            onDelete={async () => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}