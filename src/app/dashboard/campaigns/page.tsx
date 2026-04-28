'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CampaignBuilder, CampaignsList } from '@/components/campaigns/campaign-manager'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const mockCampaigns = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    messageTemplate: 'Hello {{name}}, enjoy 20% off with code SUMMER20!',
    status: 'DONE' as const,
    totalRecipients: 500,
    sentCount: 480,
    failedCount: 20,
    successRate: 96,
    baseDelay: 30,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'New Product Launch',
    messageTemplate: 'Hi {{name}}! Check out our new product line.',
    status: 'SENDING' as const,
    totalRecipients: 1200,
    sentCount: 650,
    failedCount: 12,
    successRate: 98,
    baseDelay: 25,
    createdAt: new Date(),
  },
]

const mockContacts = [
  { id: '1', name: 'John Doe', phone: '+1234567890' },
  { id: '2', name: 'Jane Smith', phone: '+1987654321' },
]

export default function CampaignsPage() {
  const [showBuilder, setShowBuilder] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">Manage bulk messaging campaigns</p>
        </div>
        <Button onClick={() => setShowBuilder(!showBuilder)}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {showBuilder && (
        <CampaignBuilder
          onCreate={async () => {
            setShowBuilder(false)
          }}
          contacts={mockContacts}
        />
      )}

      <CampaignsList campaigns={mockCampaigns} />
    </div>
  )
}