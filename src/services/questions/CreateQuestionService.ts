import prisma from "../../lib/prisma"

interface CreateQuestionProps {
  text: string
}

class CreateQuestionService {
  async execute({ text }: CreateQuestionProps) {
    try {
      const question = await prisma.question.create({
        data: {
          text,
        },
      })

      return question
    } catch (error) {
      throw new Error("Failed to save data to database")
    }
  }
}

export { CreateQuestionService }
