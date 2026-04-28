#!/bin/bash

set -e

echo "🚀 GetChatPilot Deployment Script"
echo "=================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    echo -e "${YELLOW}Creating .env from template...${NC}"
    if [ -f .env.production ]; then
        cp .env.production .env
        echo -e "${GREEN}✅ Created .env from .env.production${NC}"
        echo -e "${RED}⚠️  IMPORTANT: Edit .env and fill in all required values!${NC}"
    else
        echo -e "${RED}❌ .env.production not found. Please create .env manually.${NC}"
        exit 1
    fi
fi

# Create data directories
echo -e "${YELLOW}📁 Creating data directories...${NC}"
mkdir -p ~/getchatpilot/data/postgres
mkdir -p ~/getchatpilot/data/redis
mkdir -p ~/getchatpilot/data/evolution
echo -e "${GREEN}✅ Data directories created${NC}"

# Install npm dependencies
echo -e "${YELLOW}📦 Installing npm dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma client generated${NC}"

# Push database schema
echo -e "${YELLOW}🗄️  Pushing database schema...${NC}"
npx prisma db push
echo -e "${GREEN}✅ Database schema pushed${NC}"

# Build Docker containers
echo -e "${YELLOW}🐳 Building and starting Docker containers...${NC}"
cd docker
docker-compose up -d --build
cd ..

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check container status
echo -e "${YELLOW}📊 Container status:${NC}"
docker ps --filter "name=getchatpilot" --filter "name=evolution"

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Services:"
echo "  - Next.js App:     http://localhost:3000"
echo "  - Evolution API:  http://localhost:8080"
echo "  - PostgreSQL:     localhost:5432"
echo "  - Redis:          localhost:6379"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: cd docker && docker-compose down"
