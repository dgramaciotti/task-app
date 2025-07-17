import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  Promise.all(
    [...Array(20).keys()].map(i => {
      return prisma.task.create({
        data: {
          content: `Task ${i}`,
          completed: Math.random() > 0.2 ? true : false,
        },
      })
    })
  )
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect()
  })
