import { z } from "zod"
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

import { CreateAnswerController } from "../../controllers/answers/CreateAnswerController"

export async function registerAnswer(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/answer",
    {
      schema: {
        body: z.object({
          answerArray: z.array(
            z.object({
              value: z.number().int().max(4),
              questionId: z.string(),
            })
          ),
        }),
        querystring: z.object({
          user: z.string().min(3),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateAnswerController().handle(request, reply)
    }
  )
}
