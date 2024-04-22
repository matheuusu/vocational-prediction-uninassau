import prisma from "../../utils/prisma"

class ListAnswersService {
  async execute() {
    const answers = await prisma.answer.findMany({
      where: {
        user: "Matheus Silva",
      },
      include: {
        question: true,
      },
    })

    return answers
  }
}

export { ListAnswersService }
