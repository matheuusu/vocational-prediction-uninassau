import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { AnswerDetailController } from "../../controllers/answers/AnswerDetailController"

export async function answerDetail(fastify: FastifyInstance) {
  fastify.get(
    "/answer-detail",
    {
      schema: {
        summary: "Receive details of responses",
        tags: ["answers"],
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AnswerDetailController().handle(request, reply)
    }
  )
}
