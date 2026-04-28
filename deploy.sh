#!/bin/bash

set -e

echo "🚀 GetChatPilot Deployment Script"
echo "=================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    if [ -f .env.production ]; then
        cp .env.production .env
        echo -e "${GREEN}✅ Created .env from .env.production${NC}"
    else
        echo -e "${RED}❌ .env.production not found.${NC}"
        exit 1
    fi
fi

export NODE_ENV=production
export EVOLUTION_API_URL=http://evolution:8080

echo -e "${YELLOW}📁 Creating data directories...${NC}"
mkdir -p ~/getchatpilot/data/postgres
mkdir -p ~/getchatpilot/data/redis
mkdir -p ~/getchatpilot/data/evolution
echo -e "${GREEN}✅ Data directories created${NC}"

echo -e "${YELLOW}🐳 Building and starting Docker containers...${NC}"
cd docker
docker-compose up -d --build
cd ..

echo -e "${YELLOW}⏳ Waiting for Postgres to be ready...${NC}"
for i in {1..30}; do
    if docker exec getchatpilot_postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Postgres is ready!${NC}"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 2
done

echo -e "${YELLOW}🔧 Generating Prisma client inside container...${NC}"
docker exec getchatpilot_nextjs npx prisma generate
echo -e "${GREEN}✅ Prisma client generated${NC}"

echo -e "${YELLOW}🗄️  Pushing database schema...${NC}"
docker exec getchatpilot_nextjs npx prisma db push --skip-generate
echo -e "${GREEN}✅ Database schema pushed${NC}"

echo -e "${YELLOW}⏳ Waiting for app to be ready...${NC}"
sleep 5

echo -e "${YELLOW}📊 Container status:${NC}"
docker ps --filter "name=getchatpilot" --filter "name=evolution"

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Services:"
echo "  - Next.js App:     https://getchatpilot.com"
echo "  - Evolution API:  https://api.getchatpilot.com"
echo ""
echo "To view logs: cd docker && docker-compose logs -f"
echo "To stop: cd docker && docker-compose down"
