import prisma from "../../utils/prisma"

interface FindQuestionProps {
  questionId: string
}

class FindQuestionService {
  async execute({ questionId }: FindQuestionProps) {
    try {
      const question = await prisma.question.findFirst({
        where: {
          id: questionId,
        },
      })

      if (!question) {
        throw new Error("Question with the provided ID does not exist")
      }

      return question
    } catch (error) {
      throw new Error("Error processing the request")
    }
  }
}

export { FindQuestionService }
