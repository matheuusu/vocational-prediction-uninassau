import { FastifyRequest, FastifyReply } from "fastify"
import { ListQuestionsService } from "../../services/questions/ListQuestionsService"

class ListQuestionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listQuestionsService = new ListQuestionsService()
    const questions = await listQuestionsService.execute()

    return reply.send({
      questions: questions.map((question) => {
        return {
          id: question.id,
          text: question.text,
        }
      }),
    })
  }
}

export { ListQuestionsController }
