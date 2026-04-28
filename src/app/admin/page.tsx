'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, MessageSquare, QrCode, Zap, AlertTriangle, TrendingUp } from 'lucide-react'

const stats = [
  { title: 'Total Users', value: '1,247', icon: Users, trend: '+12%' },
  { title: 'Active Instances', value: '342', icon: QrCode, trend: '+8%' },
  { title: 'Messages Today', value: '45.2K', icon: MessageSquare, trend: '+24%' },
  { title: 'AI Responses', value: '28.1K', icon: Zap, trend: '+18%' },
  { title: 'Failed Messages', value: '1,234', icon: AlertTriangle, trend: '-5%' },
  { title: 'Revenue (MRR)', value: '$24,580', icon: TrendingUp, trend: '+15%' },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="success" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
                <stat.icon className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'john@example.com', action: 'Created new instance', time: '2 min ago' },
                { user: 'jane@example.com', action: 'Started campaign', time: '5 min ago' },
                { user: 'alice@example.com', action: 'Updated AI settings', time: '12 min ago' },
                { user: 'bob@example.com', action: 'Imported 500 contacts', time: '15 min ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Redis Cache</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Evolution API</span>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Message Queue</span>
              <Badge variant="warning">High Load</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <Badge variant="secondary">78% Used</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}