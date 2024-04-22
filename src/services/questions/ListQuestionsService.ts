import prisma from "../../utils/prisma"

class ListQuestionsService {
  async execute() {
    const questions = await prisma.question.findMany()

    return questions
  }
}

export { ListQuestionsService }
