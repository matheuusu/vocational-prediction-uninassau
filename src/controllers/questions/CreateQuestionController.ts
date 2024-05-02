import { FastifyRequest, FastifyReply } from "fastify"
import { CreateQuestionService } from "../../services/questions/CreateQuestionService"
import { CustomError } from "../../utils/errors/CustomError"

class CreateQuestionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { text, trait, courseId } = request.body as {
        text: string
        trait: string
        courseId: string
      }

      const { execute: createQuestionExecute } = new CreateQuestionService()
      const question = await createQuestionExecute({ text, trait, courseId })

      return reply.status(201).send({ questionId: question.id })
    } catch (error) {
      throw new CustomError(500, "Internal server error")
    }
  }
}

export { CreateQuestionController }
