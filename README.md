# GetChatPilot

Enterprise-grade WhatsApp Marketing & AI Automation SaaS platform built with Next.js 14, PostgreSQL, Prisma, Redis, and BullMQ.

## Features

- **WhatsApp Integration**: Connect unlimited WhatsApp instances with QR code scanning via Evolution API
- **AI-Powered Responses**: Context-aware AI using Google Gemini for intelligent auto-replies
- **CRM System**: Manage contacts with tags, notes, and CSV import/export
- **Bulk Messaging**: Send personalized bulk messages with anti-ban throttling
- **Real-time Notifications**: Live updates via Pusher WebSockets
- **Human Handover**: Automatic escalation to human agents when AI detects frustration
- **Analytics Dashboard**: Track message delivery, AI usage, and campaign stats
- **Admin Panel**: System-wide user management and configuration

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Cache/Queue**: Redis, BullMQ
- **WhatsApp API**: Evolution API
- **AI**: Google Gemini
- **Real-time**: Pusher
- **Authentication**: NextAuth.js with Google OAuth

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Evolution API (optional, for WhatsApp integration)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/getchatpilot.git
cd getchatpilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database:
```bash
npm run db:push
npm run db:generate
```

5. Start the development server:
```bash
npm run dev
```

### Docker Setup

```bash
cd docker
docker-compose up -d
```

## API Documentation

### Instances
- `POST /api/instances` - Create, connect, logout, or delete instance
- `GET /api/instances` - Get instance details

### Contacts
- `GET /api/contacts` - List contacts with filtering
- `POST /api/contacts` - Create single contact
- `PUT /api/contacts` - Import contacts via CSV
- `PATCH /api/contacts` - Update contact
- `DELETE /api/contacts` - Delete contact

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PATCH /api/campaigns` - Update campaign status
- `DELETE /api/campaigns` - Delete campaign

### Messages
- `POST /api/messages` - Send message
- `PUT /api/messages` - Mark message as read

### Webhooks
- `POST /api/webhooks/evolution` - Handle Evolution API events

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT License - see LICENSE file for details.