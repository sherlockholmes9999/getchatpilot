'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Settings,
  Key,
  Clock,
  Database,
  Globe,
  AlertTriangle,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

interface SystemSettings {
  globalGeminiKey?: string
  globalEvolutionApiKey?: string
  evolutionApiUrl: string
  sleepingHoursStart: number
  sleepingHoursEnd: number
  baseDelay: number
  maxRetries: number
}

interface ApiLog {
  id: string
  endpoint: string
  method: string
  statusCode: number
  duration: number
  createdAt: Date
  instanceName?: string
  errorMessage?: string
}

interface SystemSettingsPanelProps {
  settings: SystemSettings
  logs: ApiLog[]
  onUpdateSettings: (settings: SystemSettings) => Promise<void>
}

export function SystemSettingsPanel({
  settings,
  logs,
  onUpdateSettings,
}: SystemSettingsPanelProps) {
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdateSettings(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration
          </CardTitle>
          <CardDescription>Configure global system settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Global Gemini API Key
              </Label>
              <Input
                type="password"
                value={form.globalGeminiKey || ''}
                onChange={(e) => setForm({ ...form, globalGeminiKey: e.target.value })}
                placeholder="Enter global Gemini API key"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Evolution API Key
              </Label>
              <Input
                type="password"
                value={form.globalEvolutionApiKey || ''}
                onChange={(e) => setForm({ ...form, globalEvolutionApiKey: e.target.value })}
                placeholder="Enter Evolution API key"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Evolution API URL
              </Label>
              <Input
                value={form.evolutionApiUrl}
                onChange={(e) => setForm({ ...form, evolutionApiUrl: e.target.value })}
                placeholder="http://localhost:8080"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Sleeping Hours
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={23}
                  value={form.sleepingHoursStart}
                  onChange={(e) =>
                    setForm({ ...form, sleepingHoursStart: parseInt(e.target.value) || 23 })
                  }
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  min={0}
                  max={23}
                  value={form.sleepingHoursEnd}
                  onChange={(e) =>
                    setForm({ ...form, sleepingHoursEnd: parseInt(e.target.value) || 7 })
                  }
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">(hours)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Base Delay (seconds)
              </Label>
              <Input
                type="number"
                min={5}
                value={form.baseDelay}
                onChange={(e) => setForm({ ...form, baseDelay: parseInt(e.target.value) || 30 })}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Max Retries
              </Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={form.maxRetries}
                onChange={(e) => setForm({ ...form, maxRetries: parseInt(e.target.value) || 3 })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Logs</CardTitle>
          <CardDescription>Recent API calls to Evolution API</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Instance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs">
                    {formatDateTime(log.createdAt)}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.method === 'GET'
                          ? 'secondary'
                          : log.method === 'POST'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {log.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={log.statusCode < 400 ? 'success' : 'destructive'}
                    >
                      {log.statusCode}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.duration}ms</TableCell>
                  <TableCell>{log.instanceName || '-'}</TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No API logs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}