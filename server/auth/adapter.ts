import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user)

export { prismaClient, adapter }
