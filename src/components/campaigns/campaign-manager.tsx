'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Play,
  Pause,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Calendar,
} from 'lucide-react'

interface Campaign {
  id: string
  name: string
  messageTemplate: string
  status: 'PENDING' | 'PROCESSING' | 'SENDING' | 'DONE' | 'PAUSED' | 'FAILED'
  totalRecipients: number
  sentCount: number
  failedCount: number
  successRate: number
  baseDelay: number
  scheduledAt?: Date
  createdAt: Date
}

interface CampaignBuilderProps {
  onCreate: (data: CampaignData) => Promise<void>
  contacts: { id: string; name: string; phone: string }[]
}

interface CampaignData {
  name: string
  messageTemplate: string
  baseDelay: number
  randomDelay: number
  scheduledAt?: string
  contactIds: string[]
}

export function CampaignBuilder({ onCreate, contacts }: CampaignBuilderProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [baseDelay, setBaseDelay] = useState(30)
  const [randomDelay, setRandomDelay] = useState(30)
  const [scheduledAt, setScheduledAt] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  const handleCreate = async () => {
    if (!name || !message || selectedContacts.length === 0) return

    setSending(true)
    try {
      await onCreate({
        name,
        messageTemplate: message,
        baseDelay,
        randomDelay,
        scheduledAt: scheduledAt || undefined,
        contactIds: selectedContacts,
      })
    } finally {
      setSending(false)
    }
  }

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Settings</CardTitle>
          <CardDescription>Configure your bulk messaging campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer Sale Campaign"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message Template</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hello {{name}}, we're having a summer sale! Use code SUMMER20 for 20% off."
              className="min-h-[150px]"
            />
            <p className="text-xs text-muted-foreground">
              Use {"{{name}}"} to personalize messages
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseDelay">Base Delay (seconds)</Label>
              <Input
                id="baseDelay"
                type="number"
                value={baseDelay}
                onChange={(e) => setBaseDelay(parseInt(e.target.value) || 30)}
                min={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="randomDelay">Random Delay (seconds)</Label>
              <Input
                id="randomDelay"
                type="number"
                value={randomDelay}
                onChange={(e) => setRandomDelay(parseInt(e.target.value) || 30)}
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledAt">Schedule (optional)</Label>
            <Input
              id="scheduledAt"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCreate}
            disabled={sending || !name || !message || selectedContacts.length === 0}
          >
            {sending ? (
              <>Creating Campaign...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Start Campaign ({selectedContacts.length} recipients)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Recipients</CardTitle>
          <CardDescription>
            {selectedContacts.length} contacts selected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Select</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={selectedContacts.includes(contact.id) ? 'bg-primary/5' : ''}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => toggleContact(contact.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export function CampaignsList({ campaigns }: { campaigns: Campaign[] }) {
  const statusColors = {
    PENDING: 'secondary',
    PROCESSING: 'warning',
    SENDING: 'whatsapp',
    DONE: 'success',
    PAUSED: 'secondary',
    FAILED: 'destructive',
  } as const

  const statusIcons = {
    PENDING: Clock,
    PROCESSING: Clock,
    SENDING: Send,
    DONE: CheckCircle,
    PAUSED: Pause,
    FAILED: XCircle,
  } as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
        <CardDescription>Manage your bulk messaging campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => {
              const Icon = statusIcons[campaign.status]
              const progress =
                campaign.totalRecipients > 0
                  ? Math.round((campaign.sentCount / campaign.totalRecipients) * 100)
                  : 0

              return (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {campaign.totalRecipients} recipients
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[campaign.status]}>
                      <Icon className="h-3 w-3 mr-1" />
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-[150px]">
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {campaign.sentCount}/{campaign.totalRecipients}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.successRate}%</TableCell>
                  <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.status === 'SENDING' && (
                        <Button variant="ghost" size="icon">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {campaign.status === 'PAUSED' && (
                        <Button variant="ghost" size="icon">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {campaigns.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No campaigns yet. Create your first campaign above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}