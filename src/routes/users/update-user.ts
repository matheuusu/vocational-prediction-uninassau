import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

import { UpdateUserController } from "../../controllers/users/UpdateUserController"

export async function updateUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put(
    "/users/:userId",
    {
      schema: {
        summary: "Update a user info",
        tags: ["users"],
        body: z.object({
          userName: z.string().min(3).nullable(),
          email: z.string().email().nullable(),
          phone: z.string().nullable(),
        }),
        params: z.object({
          userId: z.string(),
        }),
        response: {
          200: z.object({
            updatedUser: z.object({
              name: z.string().min(3),
              email: z.string().email(),
              phone: z.string(),
            }),
          }),
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateUserController().handle(request, reply)
    }
  )
}
