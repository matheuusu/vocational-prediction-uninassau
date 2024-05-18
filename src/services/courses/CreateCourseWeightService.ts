import prisma from "../../lib/prisma"
import { BadRequest } from "../../utils/errors/bad-request"

interface CreateCourseWeightProps {
  value: number
  courseId: string
  questionId: string
}

class CreateCourseWeightService {
  async execute({ value, courseId, questionId }: CreateCourseWeightProps) {
    const [course, question] = await Promise.all([
      prisma.course.findUnique({
        where: {
          id: courseId,
        },
      }),

      prisma.question.findUnique({
        where: {
          id: questionId,
        },
      }),
    ])

    if (!course || !question) {
      throw new BadRequest("the course or question id was not found")
    }

    const weight = await prisma.courseWeight.create({
      data: {
        weight: value,
        courseId,
        questionId,
      },
    })

    return weight
  }
}

export { CreateCourseWeightService }
