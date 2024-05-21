import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { AnswerDetailsController } from "../../controllers/answers/AnswerDetailController"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export async function answerDetail(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/answer-detail",
    {
      schema: {
        summary: "Receive details of a user answer",
        tags: ["answers"],
        querystring: z.object({
          userId: z.string(),
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
      return new AnswerDetailsController().handle(request, reply)
    }
  )
}
