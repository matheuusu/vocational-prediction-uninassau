import { FastifyRequest, FastifyReply } from "fastify"
import { ListAnswersService } from "../../services/answers/ListAnswersService"

class ListAnswersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { execute: answerServiceExecute } = new ListAnswersService()
    const listAnswer = await answerServiceExecute()

    return reply.send(listAnswer)
  }
}

export { ListAnswersController }
