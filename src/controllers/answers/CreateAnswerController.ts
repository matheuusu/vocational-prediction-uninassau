import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAnswerService } from "../../services/answers/CreateAnswerService"
import { z } from "zod"

class CreateAnswerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createAnswerSchema = z.object({
      user: z.string(),
      value: z.number(),
      questionId: z.string(),
    })

    const { answerArray } = request.body as { answerArray: any[] }

    if (answerArray.length !== 10) {
      return reply.status(400).send({ message: "há um problema nas questões" })
    }

    const answerService = new CreateAnswerService()

    answerArray.forEach(async (answers) => {
      const { value, user, questionId } = createAnswerSchema.parse(answers)

      const answer = await answerService.execute({
        user,
        value,
        questionId,
      })
    })

    return reply.status(201).send({ message: "responses were submitted" })
  }
}

export { CreateAnswerController }
