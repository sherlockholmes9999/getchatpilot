'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QrCode, Trash2, RefreshCw, Wifi, WifiOff, Loader2 } from 'lucide-react'
import QRCode from 'qrcode'

interface Instance {
  id: string
  name: string
  status: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'FAILED'
  qrCode?: string
  lastConnection?: Date
}

interface InstanceManagerProps {
  instances: Instance[]
  userId: string
  onCreate: () => Promise<void>
  onConnect: (name: string) => Promise<void>
  onLogout: (name: string) => Promise<void>
  onDelete: (name: string) => Promise<void>
}

export function InstanceManager({
  instances,
  userId,
  onCreate,
  onConnect,
  onLogout,
  onDelete,
}: InstanceManagerProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  useEffect(() => {
    if (selectedInstance?.qrCode) {
      QRCode.toDataURL(selectedInstance.qrCode, {
        width: 300,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      }).then(setQrCodeUrl)
    }
  }, [selectedInstance])

  const handleConnect = async (name: string) => {
    setLoading(name)
    try {
      await onConnect(name)
      const instance = instances.find((i) => i.name === name)
      if (instance) {
        setSelectedInstance(instance)
        setQrDialogOpen(true)
      }
    } finally {
      setLoading(null)
    }
  }

  const statusBadge = (status: string) => {
    const config = {
      CONNECTED: { variant: 'success' as const, icon: Wifi, text: 'Connected' },
      DISCONNECTED: { variant: 'secondary' as const, icon: WifiOff, text: 'Disconnected' },
      CONNECTING: { variant: 'warning' as const, icon: Loader2, text: 'Connecting' },
      FAILED: { variant: 'destructive' as const, icon: WifiOff, text: 'Failed' },
    }
    const { variant, icon: Icon, text } = config[status as keyof typeof config] || config.DISCONNECTED
    return (
      <Badge variant={variant}>
        <Icon className="h-3 w-3 mr-1" />
        {text}
      </Badge>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>WhatsApp Instances</CardTitle>
              <CardDescription>Manage your WhatsApp connections</CardDescription>
            </div>
            <Button onClick={onCreate} disabled={loading !== null}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <QrCode className="h-4 w-4 mr-2" />
              )}
              New Instance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Connected</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instances.map((instance) => (
                <TableRow key={instance.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-mono text-sm">{instance.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{statusBadge(instance.status)}</TableCell>
                  <TableCell>
                    {instance.lastConnection
                      ? new Date(instance.lastConnection).toLocaleString()
                      : 'Never'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {instance.status !== 'CONNECTED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConnect(instance.name)}
                          disabled={loading === instance.name}
                        >
                          {loading === instance.name ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <QrCode className="h-4 w-4 mr-1" />
                              Connect
                            </>
                          )}
                        </Button>
                      )}
                      {instance.status === 'CONNECTED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLogout(instance.name)}
                          disabled={loading === instance.name}
                        >
                          <WifiOff className="h-4 w-4 mr-1" />
                          Disconnect
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(instance.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {instances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No instances yet. Click "New Instance" to connect your WhatsApp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Open WhatsApp on your phone and scan the QR code
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            ) : (
              <div className="w-64 h-64 bg-muted animate-pulse rounded-lg" />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQrDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedInstance && handleConnect(selectedInstance.name)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh QR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}