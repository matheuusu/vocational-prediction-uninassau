import prisma from "../../lib/prisma"

class ListAnswersService {
  async execute() {
    const latestUser = await prisma.answer.findFirst({
      select: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    })

    const answers = await prisma.answer.findMany({
      where: {
        user: latestUser?.user,
      },
      include: {
        question: true,
      },
    })

    return answers
  }
}

export { ListAnswersService }
