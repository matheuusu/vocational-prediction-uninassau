import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ListAnswersController } from "../../controllers/answers/ListAnswersController"

export async function listAnswers(fastify: FastifyInstance) {
  fastify.get(
    "/answers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListAnswersController().handle(request, reply)
    }
  )
}