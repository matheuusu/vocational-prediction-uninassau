import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateUserService } from "../../services/users/UpdateUserService"
import { BadRequest } from "../../utils/errors/bad-request"

class UpdateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }
    const { name, email, phone } = request.body as {
      name?: string
      email?: string
      phone?: string
    }

    const { execute: updateUserService } = new UpdateUserService()

    try {
      const updatedUser = await updateUserService({
        userId,
        data: { name, email, phone },
      })

      return reply.status(200).send({
        updatedUser: {
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
      })
    } catch (error) {
      if (error instanceof BadRequest) {
        return reply.status(404).send({ error: error.message })
      }

      return reply.status(500).send({ error: "Failed to update user" })
    }
  }
}

export { UpdateUserController }