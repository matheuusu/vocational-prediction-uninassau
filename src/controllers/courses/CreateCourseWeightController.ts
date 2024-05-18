import { FastifyRequest, FastifyReply } from "fastify"
import { BadRequest } from "../../utils/errors/bad-request"
import { CreateCourseWeightService } from "../../services/courses/CreateCourseWeightService"

class CreateCourseWeightController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { value, courseId, questionId } = request.body as {
      value: number
      courseId: string
      questionId: string
    }

    const { execute: CreateCourseWeight } = new CreateCourseWeightService()

    try {
      const courseWeight = await CreateCourseWeight({
        value,
        courseId,
        questionId,
      })

      return reply.status(201).send({ weightId: courseWeight.id })
    } catch (error) {
      if (error instanceof BadRequest) {
        return reply.status(400).send({ error: error.message })
      }

      return reply.status(500).send({ error: "failure during weight creation" })
    }
  }
}

export { CreateCourseWeightController }
