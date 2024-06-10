import { FastifyRequest, FastifyReply } from "fastify"
import { CreateUserService } from "../../services/users/CreateUserService"

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userName } = request.body as {
        userName: string
      }

      // Calling create user service
      const { execute: createUserService } = new CreateUserService()
      const user = await createUserService({ userName })

      return reply.status(201).send({ userId: user.id })
    } catch (error) {
      console.log(error)
      throw new Error("Error processing data")
    }
  }
}

export { CreateUserController }
