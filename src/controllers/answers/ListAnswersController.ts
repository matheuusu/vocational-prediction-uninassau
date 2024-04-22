import { FastifyRequest, FastifyReply } from "fastify"
import { ListAnswersService } from "../../services/answers/ListAnswersService"

class ListAnswersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAnswersService = new ListAnswersService()
    const listAnswer = await listAnswersService.execute()

    return reply.send(listAnswer)
  }
}

export { ListAnswersController }
