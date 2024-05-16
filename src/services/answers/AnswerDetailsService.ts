import prisma from "../../lib/prisma"

interface AnswerDetailsProps {
  trait?: string
}

class AnswerDetailsService {
  async execute({ trait }: AnswerDetailsProps) {
    const courses = await prisma.course.findMany({
      where: {
        trait,
      },
    })

    return courses
  }
}

export { AnswerDetailsService }
