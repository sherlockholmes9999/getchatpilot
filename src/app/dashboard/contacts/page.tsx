'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CSVImporter } from '@/components/contacts/csv-importer'
import { ContactsTable } from '@/components/contacts/contacts-table'
import { Plus } from 'lucide-react'

const mockContacts = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    tags: ['Lead', 'VIP'],
    aiEnabled: true,
    isBlacklisted: false,
    lastMessageAt: new Date(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1987654321',
    email: 'jane@example.com',
    tags: ['Customer'],
    aiEnabled: false,
    isBlacklisted: false,
    lastMessageAt: new Date(),
  },
]

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage your CRM contacts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContactsTable
            contacts={mockContacts}
            onSearch={() => {}}
            onToggleAI={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onSendMessage={() => {}}
          />
        </div>
        <div>
          <CSVImporter
            onImport={async () => ({ imported: 0, skipped: 0, invalid: [] })}
            instanceId=""
            userId=""
          />
        </div>
      </div>
    </div>
  )
}