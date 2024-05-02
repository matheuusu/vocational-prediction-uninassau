import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ListQuestionsController } from "../../controllers/questions/ListQuestionsController"

export async function listQuestions(fastify: FastifyInstance) {
  fastify.get(
    "/questions",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListQuestionsController().handle(request, reply)
    }
  )
}
