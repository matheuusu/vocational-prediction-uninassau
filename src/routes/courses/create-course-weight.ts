import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

import { CreateCourseWeightController } from "../../controllers/courses/CreateCourseWeightController"

export async function createCourseWeight(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/course/weight",
    {
      schema: {
        summary: "Create a course weight for a question",
        tags: ["courses", "questions"],
        body: z.object({
          weights: z.array(
            z.object({
              value: z.number().positive(),
              courseId: z.string(),
              questionId: z.string(),
            })
          ),
        }),
        response: {
          201: z.object({
            createdWeights: z.array(
              z.object({
                weightId: z.string(),
              })
            ),
          }),
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCourseWeightController().handle(request, reply)
    }
  )
}
