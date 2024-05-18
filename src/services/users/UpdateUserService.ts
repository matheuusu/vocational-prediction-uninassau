import prisma from "../../lib/prisma"
import { BadRequest } from "../../utils/errors/bad-request"

interface UpdateUserProps {
  userId: string
  data: UpdateUserDataProps
}

interface UpdateUserDataProps {
  name?: string
  email?: string
  phone?: string
}

class UpdateUserService {
  async execute({ userId, data }: UpdateUserProps) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new BadRequest(`User with ID ${userId} not found`)
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name ?? user.name,
        email: data.email ?? user.email,
        phone: data.phone ?? user.phone,
      },
    })

    return updatedUser
  }
}

export { UpdateUserService }
