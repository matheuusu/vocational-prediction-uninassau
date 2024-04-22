import { FastifyRequest, FastifyReply } from "fastify"
import { CreateQuestionService } from "../../services/questions/CreateQuestionService"
import { z } from "zod"

class CreateQuestionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createQuestionSchema = z.object({
      text: z.string(),
      trait: z.string(),
    })

    const { text, trait } = createQuestionSchema.parse(request.body)

    const createQuestionService = new CreateQuestionService()
    const question = await createQuestionService.execute({ text, trait })

    return reply.status(201).send(question)
  }
}

export { CreateQuestionController }
