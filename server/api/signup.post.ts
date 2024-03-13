import { lucia } from '../auth/lucia'
import { Argon2id } from 'oslo/password'
import { prismaClient } from '../auth/adapter'
import validateSignupDate from '@/validation/signupData.validation'
import { Prisma, User } from '@prisma/client'
import { ApiError, ApiResponse } from '../types'
import updateSession from '../auth/updateSession'

export default defineEventHandler(async (event): Promise<ApiResponse<Omit<User, 'hashedPassword'>>> => {
  const validationResult = await readValidatedBody(event, (body) => validateSignupDate(body))

  if (!validationResult.success) {
    return {
      data: null,
      error: {
        message: 'E-Mail or password invalid',
        type: 'invalidCredentials',
      },
    }
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

    await updateSession(user.id, event)

    return {
      data: { id: user.id, email: user.email },
      error: null,
    }
  } catch (error) {
    const prismaError = handlePrismaError(error)

    return {
      data: null,
      error: prismaError,
    }
  }
})

function handlePrismaError(error: unknown): ApiError {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return {
      message: 'This email is already in use',
      type: 'emailAlreadyInUse',
    }
  }

  console.error(error)
  return {
    message: 'An error occurred',
    type: 'unknown',
  }
}
