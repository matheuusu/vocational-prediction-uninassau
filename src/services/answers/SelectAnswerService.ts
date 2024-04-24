import prisma from "../../utils/prisma"

class SelectAnswerService {
  async execute() {
    const [user] = await prisma.answer.findMany({
      select: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
      take: 1,
    })

    const userAnswers = await prisma.answer.findMany({
      where: {
        user: user.user,
      },
      include: {
        question: true,
      },
    })

    return userAnswers
  }
}

export { SelectAnswerService }
