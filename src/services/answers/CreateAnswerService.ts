import prisma from "../../lib/prisma"

interface CreateAnswerProps {
  value: number
  userId: string
  questionId: string
}

class CreateAnswerService {
  async execute({ value, userId, questionId }: CreateAnswerProps) {
    const answer = await prisma.answer.create({
      data: {
        value,
        userId,
        questionId,
      },
    })

    return answer
  }
}

export { CreateAnswerService }
