import prisma from "../../lib/prisma"

class SelectAnswerService {
  async execute() {
    try {
      // Search the last user in the answer table
      const latestUser = await prisma.answer.findFirst({
        select: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      })

      if (!latestUser) {
        throw new Error("User was not found in the answers")
      }

      // Search all answers from the found user
      const userAnswers = await prisma.answer.findMany({
        where: {
          user: latestUser?.user,
        },
        include: {
          question: true,
        },
      })

      return userAnswers
    } catch (error) {
      throw new Error("Error selecting user responses")
    }
  }
}

export { SelectAnswerService }
