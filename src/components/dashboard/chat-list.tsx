'use client'

import { MessageSquare, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chat {
  id: string
  name: string
  phone: string
  lastMessage: string
  unread: number
}

interface ChatListProps {
  chats: Chat[]
  selectedChatId?: string
  onSelectChat?: (chat: Chat) => void
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelectChat?.(chat)}
          className={cn(
            'w-full p-4 text-left hover:bg-muted transition-colors',
            selectedChatId === chat.id && 'bg-muted'
          )}
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
              {chat.name[0]?.toUpperCase() || 'C'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">{chat.name}</p>
                {chat.unread > 0 && (
                  <span className="h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
          </div>
        </button>
      ))}
      {chats.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No active chats</p>
        </div>
      )}
    </div>
  )
}