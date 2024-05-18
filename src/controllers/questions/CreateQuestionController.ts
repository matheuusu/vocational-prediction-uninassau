import { FastifyRequest, FastifyReply } from "fastify"
import { CreateQuestionService } from "../../services/questions/CreateQuestionService"
import { BadRequest } from "../../utils/errors/bad-request"

class CreateQuestionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { text } = request.body as { text: string }

      const { execute: createQuestionExecute } = new CreateQuestionService()
      const question = await createQuestionExecute({ text })

      return reply.status(201).send({ questionId: question.id })
    } catch (error) {
      throw new BadRequest("Internal server error")
    }
  }
}

export { CreateQuestionController }
