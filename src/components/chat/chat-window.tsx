'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Send, MoreVertical, Phone, Video, Image as ImageIcon } from 'lucide-react'
import { formatTime } from '@/lib/utils'

interface Message {
  id: string
  text: string
  fromMe: boolean
  timestamp: Date
  status: 'SENT' | 'DELIVERED' | 'READ'
}

interface ChatWindowProps {
  chatId: string
  chatName: string
  phone: string
  messages: Message[]
  aiEnabled: boolean
  isHandoverActive: boolean
  onSendMessage: (message: string) => void
  onToggleAI: (enabled: boolean) => void
  onTakeover: () => void
}

export function ChatWindow({
  chatId,
  chatName,
  phone,
  messages,
  aiEnabled,
  isHandoverActive,
  onSendMessage,
  onToggleAI,
  onTakeover,
}: ChatWindowProps) {
  const [message, setMessage] = useState('')
  const [showTakeover, setShowTakeover] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {chatName[0]?.toUpperCase() || 'C'}
          </div>
          <div>
            <CardTitle className="text-sm">{chatName}</CardTitle>
            <p className="text-xs text-muted-foreground">{phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isHandoverActive ? 'warning' : 'success'}>
            {isHandoverActive ? 'Human Active' : 'AI Active'}
          </Badge>
          {isHandoverActive && (
            <Button size="sm" variant="outline" onClick={onTakeover}>
              Take Over
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.fromMe
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                {msg.fromMe && (
                  <span className="text-xs opacity-70">
                    {msg.status === 'READ' ? '✓✓' : msg.status === 'DELIVERED' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}