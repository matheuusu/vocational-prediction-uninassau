import prisma from "../../utils/prisma"

interface CreateQuestionProps {
  text: string
  trait: string
  courseId?: string
}

class CreateQuestionService {
  async execute({ text, trait, courseId }: CreateQuestionProps) {
    const question = await prisma.question.create({
      data: {
        text,
        trait,
        courseId,
      },
    })

    return question
  }
}

export { CreateQuestionService }
