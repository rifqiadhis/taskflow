import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Create PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Create Prisma Client with adapter
export const prisma = new PrismaClient({ adapter })

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect()
    await pool.end()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    await pool.end()
    process.exit(0)
})
