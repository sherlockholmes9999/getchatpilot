const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  const settings = await prisma.systemSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      evolutionApiUrl: 'http://localhost:8080',
      sleepingHoursStart: 23,
      sleepingHoursEnd: 7,
      baseDelay: 30,
      maxRetries: 3,
    },
  })

  console.log('Created system settings:', settings.id)

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })