import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Starting database seed...')

    // Clear existing tasks
    await prisma.task.deleteMany()
    console.log('✅ Cleared existing tasks')

    // Create sample tasks
    const tasks = await prisma.task.createMany({
        data: [
            {
                title: 'Set up project repository',
                description: 'Initialize Git repository and create README',
                status: 'done',
            },
            {
                title: 'Design database schema',
                description: 'Plan out the task management data model with Prisma',
                status: 'done',
            },
            {
                title: 'Build REST API endpoints',
                description: 'Implement CRUD operations for task management',
                status: 'in-progress',
            },
            {
                title: 'Add API documentation',
                description: 'Set up Swagger/OpenAPI documentation',
                status: 'in-progress',
            },
            {
                title: 'Create frontend dashboard',
                description: 'Build React UI for task management',
                status: 'todo',
            },
            {
                title: 'Implement user authentication',
                description: 'Add JWT authentication for API security',
                status: 'todo',
            },
            {
                title: 'Write unit tests',
                description: 'Add test coverage for API endpoints',
                status: 'todo',
            },
            {
                title: 'Deploy to production',
                description: 'Set up CI/CD and deploy to cloud provider',
                status: 'todo',
            },
        ],
    })

    console.log(`✅ Created ${tasks.count} sample tasks`)

    // Display the created tasks
    const allTasks = await prisma.task.findMany({
        orderBy: { createdAt: 'asc' },
    })

    console.log('\n📋 Sample Tasks Created:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    allTasks.forEach((task, index) => {
        const statusEmoji = {
            'todo': '⏳',
            'in-progress': '🔨',
            'done': '✅',
        }[task.status] || '📝'

        console.log(`${index + 1}. ${statusEmoji} [${task.status.toUpperCase()}] ${task.title}`)
        if (task.description) {
            console.log(`   ${task.description}`)
        }
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`\n🎉 Database seeding completed successfully!`)
    console.log(`\n💡 You can now:`)
    console.log(`   - View tasks at: http://localhost:3000/tasks`)
    console.log(`   - Use Swagger UI: http://localhost:3000/swagger`)
    console.log(`   - Open Prisma Studio: bun run db:studio`)
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
