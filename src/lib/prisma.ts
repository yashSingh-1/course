import { PrismaClient } from '@prisma/client'

// Declare global variable to prevent multiple instances in development
declare global {
  var prisma: PrismaClient | undefined
}

// Initialize Prisma Client
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// In development, attach instance to global to prevent multiple instances
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
