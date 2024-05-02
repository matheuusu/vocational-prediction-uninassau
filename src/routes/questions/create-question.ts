import { z } from "zod"
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

import { CreateQuestionController } from "../../controllers/questions/CreateQuestionController"

export async function createQuestion(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/question",
    {
      schema: {
        body: z.object({
          text: z.string(),
          trait: z.string(),
          courseId: z.string(),
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
