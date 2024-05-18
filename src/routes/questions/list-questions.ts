import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ListQuestionsController } from "../../controllers/questions/ListQuestionsController"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function listQuestions(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/questions",
    {
      schema: {
        summary: "Get all questions",
        tags: ["questions"],
        response: {
          200: z.object({
            questions: z.array(
              z.object({
                id: z.string(),
                text: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListQuestionsController().handle(request, reply)
    }
  )
}
