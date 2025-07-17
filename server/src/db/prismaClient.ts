import { PrismaClient, Task } from '../../generated/prisma'

const prisma = new PrismaClient()

export default prisma
export { Task }
