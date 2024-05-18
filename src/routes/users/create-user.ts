import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

import { CreateUserController } from "../../controllers/users/CreateUserController"

export async function createUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        summary: "Create a user",
        tags: ["users"],
        body: z.object({
          name: z.string().min(3),
          email: z.string().email().nullable(),
          phone: z.string().nullable(),
        }),
        response: {
          201: z.object({
            userId: z.string(),
          }),
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply)
    }
  )
}
