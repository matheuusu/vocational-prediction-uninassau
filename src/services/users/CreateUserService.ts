import prisma from "../../lib/prisma"

interface CreateUserProps {
  name: string
  email?: string
  phone?: string
}

class CreateUserService {
  async execute({ name, email, phone }: CreateUserProps) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
      },
    })

    return user
  }
}

export { CreateUserService }
