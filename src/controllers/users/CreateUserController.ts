import { FastifyRequest, FastifyReply } from "fastify"
import { CreateUserService } from "../../services/users/CreateUserService"

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, phone } = request.body as {
        name: string
        email?: string
        phone?: string
      }

      const { execute: createUserService } = new CreateUserService()
      const user = await createUserService({ name, email, phone })

      return reply.status(201).send({ userId: user.id })
    } catch (error) {
      console.log(error)
      throw new Error("Error processing data")
    }
  }
}

export { CreateUserController }
