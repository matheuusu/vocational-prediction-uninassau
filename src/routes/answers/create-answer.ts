import { z } from "zod"
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

import { CreateAnswerController } from "../../controllers/answers/CreateAnswerController"

export async function createAnswer(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/answers",
    {
      schema: {
        summary: "Register answers and receive scores",
        tags: ["answers"],
        body: z.object({
          userName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          answers: z.array(
            z.object({
              value: z.number().int().max(4),
              questionId: z.string(),
            })
          ),
        }),
        response: {
          201: z.object({
            courseScores: z.array(
              z.object({
                id: z.string(),
                course: z.string(),
                score: z.number().positive(),
              })
            ),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateAnswerController().handle(request, reply)
    }
  )
}
