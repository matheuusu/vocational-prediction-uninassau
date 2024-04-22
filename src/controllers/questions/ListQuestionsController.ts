import { FastifyRequest, FastifyReply } from "fastify"
import { ListQuestionsService } from "../../services/questions/ListQuestionsService"

class ListQuestionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listQuestionsService = new ListQuestionsService()
    const listQuestions = await listQuestionsService.execute()

    return reply.send(listQuestions)
  }
}

export { ListQuestionsController }
