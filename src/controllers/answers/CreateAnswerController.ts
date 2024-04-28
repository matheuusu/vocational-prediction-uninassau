import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAnswerService } from "../../services/answers/CreateAnswerService"
import { z } from "zod"

// define the response validation scheme
const createAnswerSchema = z.object({
  user: z.string(),
  value: z.number(),
  questionId: z.string(),
})

// define the expected number of responses
const answersExpected = 12

class CreateAnswerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { answerArray } = request.body as { answerArray: any[] }

    if (answerArray.length !== answersExpected) {
      reply.status(400).send({ message: "há um problema nas questões" })
    }

    const { execute: answerServiceExecute } = new CreateAnswerService()

    for (const answer of answerArray) {
      try {
        // validates each response using schema
        const { value, user, questionId } = createAnswerSchema.parse(answer)

        // calling the service to create the answers
        await answerServiceExecute({ user, value, questionId })
      } catch (error) {
        reply.status(400).send({ message: "Error processing responses" })
      }
    }

    return reply.status(201).send({ message: "Replies have been sent" })
  }
}

export { CreateAnswerController }
