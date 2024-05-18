import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

import { CreateQuestionController } from "../../controllers/questions/CreateQuestionController"

export async function createQuestion(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/questions",
    {
      schema: {
        summary: "Create a question",
        tags: ["questions"],
        body: z.object({
          text: z.string(),
        }),
        response: {
          201: z.object({
            questionId: z.string(),
          }),
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateQuestionController().handle(request, reply)
    }
  )
}
