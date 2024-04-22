import prisma from "../../utils/prisma"

interface CreateAnswerProps {
  value: number
  user: string
  questionId: string
}

class CreateAnswerService {
  async execute({ value, user, questionId }: CreateAnswerProps) {
    const answer = await prisma.answer.create({
      data: {
        value,
        user,
        questionId,
      },
    })

    return answer.id
  }
}

export { CreateAnswerService }
