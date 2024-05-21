import prisma from "../../lib/prisma"

interface CreateUserProps {
  userName: string
}

class CreateUserService {
  async execute({ userName }: CreateUserProps) {
    const user = await prisma.user.create({
      data: {
        name: userName,
      },
    })

    return user
  }
}

export { CreateUserService }
