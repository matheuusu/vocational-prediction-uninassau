import prisma from "../../lib/prisma"

interface AnswerDetailsProps {
  userId: string
}

class AnswerDetailsService {
  async execute({ userId }: AnswerDetailsProps) {
    const courses = await prisma.course.findMany({
      include: {
        courseWeight: {
          include: {
            question: {
              include: {
                answer: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    })

    return courses
  }
}

export { AnswerDetailsService }
