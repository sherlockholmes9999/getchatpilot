'use client'

import { SystemSettingsPanel } from '@/components/admin/system-settings'

const mockSettings = {
  globalGeminiKey: '',
  globalEvolutionApiKey: '',
  evolutionApiUrl: 'http://localhost:8080',
  sleepingHoursStart: 23,
  sleepingHoursEnd: 7,
  baseDelay: 30,
  maxRetries: 3,
}

const mockLogs = [
  {
    id: '1',
    endpoint: '/message/sendText',
    method: 'POST',
    statusCode: 200,
    duration: 245,
    createdAt: new Date(),
    instanceName: 'instance-abc123',
  },
  {
    id: '2',
    endpoint: '/instance/create',
    method: 'POST',
    statusCode: 201,
    duration: 123,
    createdAt: new Date(),
    instanceName: 'instance-xyz789',
  },
  {
    id: '3',
    endpoint: '/chat/fetchMessages',
    method: 'GET',
    statusCode: 200,
    duration: 89,
    createdAt: new Date(),
    instanceName: 'instance-abc123',
  },
]

export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure global system settings</p>
      </div>

      <SystemSettingsPanel
        settings={mockSettings}
        logs={mockLogs}
        onUpdateSettings={async () => {}}
      />
    </div>
  )
}