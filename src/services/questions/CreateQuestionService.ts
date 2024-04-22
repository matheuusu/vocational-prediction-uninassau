import prisma from "../../utils/prisma"

interface CreateQuestionProps {
  text: string
  trait: string
}

class CreateQuestionService {
  async execute({ text, trait }: CreateQuestionProps) {
    const question = await prisma.question.create({
      data: {
        text,
        trait,
      },
    })

    return question.id
  }
}

export { CreateQuestionService }
