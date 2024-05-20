import { FastifyRequest, FastifyReply } from "fastify"
import { BadRequest } from "../../utils/errors/bad-request"
import { CreateCourseWeightService } from "../../services/courses/CreateCourseWeightService"

class CreateCourseWeightController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { weights } = request.body as {
      weights: { value: number; courseId: string; questionId: string }[]
    }

    const createCourseWeightService = new CreateCourseWeightService()

    const createdWeights = []

    for (const weight of weights) {
      try {
        const { value, courseId, questionId } = weight

        const courseWeight = await createCourseWeightService.execute({
          value,
          courseId,
          questionId,
        })

        createdWeights.push({ weightId: courseWeight.courseId })
      } catch (error) {
        if (error instanceof BadRequest) {
          return reply.status(400).send({ error: error.message })
        }

        return reply
          .status(500)
          .send({ error: "failure during weight creation" })
      }

      console.log(createdWeights)
    }

    return reply.status(201).send({ createdWeights })
  }
}

export { CreateCourseWeightController }
