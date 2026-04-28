'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  Users,
  Send,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Bot,
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DashboardStatsProps {
  stats: {
    totalContacts: number
    activeChats: number
    messagesSent: number
    messagesDelivered: number
    messagesRead: number
    failedMessages: number
    aiResponses: number
    handovers: number
    credits: number
  }
  chartData: { name: string; messages: number; responses: number }[]
}

export function DashboardStats({ stats, chartData }: DashboardStatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Credits Remaining"
          value={stats.credits.toLocaleString()}
          icon={TrendingUp}
          trend={stats.credits > 100 ? 'up' : 'down'}
          trendValue={stats.credits > 100 ? 'Good standing' : 'Low credits'}
        />
        <StatCard
          title="Active Chats"
          value={stats.activeChats.toString()}
          icon={MessageSquare}
          subtitle={`${stats.aiResponses} AI responses`}
        />
        <StatCard
          title="Total Contacts"
          value={stats.totalContacts.toString()}
          icon={Users}
          subtitle="In your CRM"
        />
        <StatCard
          title="Human Handoffs"
          value={stats.handovers.toString()}
          icon={Bot}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Message Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Sent</span>
              </div>
              <Badge variant="secondary">{stats.messagesSent}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Delivered</span>
              </div>
              <Badge variant="success">{stats.messagesDelivered}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Read</span>
              </div>
              <Badge variant="default">{stats.messagesRead}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm">Failed</span>
              </div>
              <Badge variant="destructive">{stats.failedMessages}</Badge>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Rate</span>
                <span className="font-medium">
                  {stats.messagesSent > 0
                    ? Math.round((stats.messagesDelivered / stats.messagesSent) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="responses"
                    stroke="#25D366"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  trendValue,
  variant,
}: {
  title: string
  value: string
  icon: React.ElementType
  subtitle?: string
  trend?: 'up' | 'down'
  trendValue?: string
  variant?: 'default' | 'warning'
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trendValue && (
              <div className="flex items-center gap-1 text-xs">
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={trend === 'up' ? 'text-green-500' : 'text-destructive'}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div
            className={`p-3 rounded-full ${
              variant === 'warning' ? 'bg-yellow-500/10' : 'bg-primary/10'
            }`}
          >
            <Icon
              className={`h-6 w-6 ${variant === 'warning' ? 'text-yellow-500' : 'text-primary'}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}