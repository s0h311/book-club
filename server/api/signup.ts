import { lucia } from '../auth/lucia'
import { Argon2id } from 'oslo/password'
import { prismaClient } from '../auth/adapter'
import validateSignupDate from '@/validation/signupData.validation'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event): Promise<Response> => {
  const validationResult = await readValidatedBody(event, (body) => validateSignupDate(body))

  if (!validationResult.success) {
    return new Response('Invalid email or password', {
      status: 400,
    })
  }

  const { email, password } = validationResult.data

  const hashedPassword = await new Argon2id().hash(password)

  try {
    const user = await prismaClient.user.create({
      data: {
        email,
        hashedPassword: hashedPassword,
      },
    })

    const session = await lucia.createSession(user.id, {})

    const sessionCookie = lucia.createSessionCookie(session.id)

    const response = {
      data: user.id,
      error: null,
    }

    return new Response(JSON.stringify(response), {
      status: 302,
      headers: {
        Location: '/',
        'Set-Cookie': sessionCookie.serialize(),
      },
    })
  } catch (error) {
    const prismaError = handlePrismaError(error)

    return new Response(prismaError.message, {
      status: prismaError.status,
    })
  }
})

function handlePrismaError(error: unknown): { status: number; message: string } {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return {
      status: 400,
      message: 'This email is already in use',
    }
  }

  console.error(error)
  return {
    status: 500,
    message: 'An error occurred',
  }
}
