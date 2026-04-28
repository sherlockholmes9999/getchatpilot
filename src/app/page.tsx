import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Bot, Zap, Shield, BarChart3, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-1">
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-whatsapp-green bg-clip-text text-transparent">
            GetChatPilot
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Enterprise WhatsApp Marketing & AI Automation Platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={MessageSquare}
              title="WhatsApp Integration"
              description="Connect unlimited WhatsApp instances with QR code scanning"
            />
            <FeatureCard
              icon={Bot}
              title="AI-Powered Responses"
              description="Context-aware AI using Gemini for intelligent auto-replies"
            />
            <FeatureCard
              icon={Zap}
              title="Bulk Messaging"
              description="Send personalized bulk messages with anti-ban throttling"
            />
            <FeatureCard
              icon={Users}
              title="CRM System"
              description="Manage contacts with tags, notes, and import/export"
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Track message delivery, AI usage, and campaign stats"
            />
            <FeatureCard
              icon={Shield}
              title="Anti-Ban Protection"
              description="Smart delays and sleeping hours to prevent bans"
            />
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-muted-foreground">
        <p>&copy; 2024 GetChatPilot. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-10 w-10 mb-4 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}