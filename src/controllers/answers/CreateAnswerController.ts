import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAnswerService } from "../../services/answers/CreateAnswerService"
import { CustomError } from "../../utils/errors/CustomError"
import { AnswerDetailController } from "./AnswerDetailController"

// Define the expected number of responses
const answersExpected = 15

class CreateAnswerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { answerArray } = request.body as {
      answerArray: { value: number; questionId: string }[]
    }

    const { user } = request.query as { user: string }

    // Checks whether the number of responses is as expected
    if (answerArray.length !== answersExpected) {
      throw new CustomError(400, "incorrect number of responses received")
    }

    const { execute: answerServiceExecute } = new CreateAnswerService()

    // Scroll through responses for validation and creation
    for (const answer of answerArray) {
      try {
        // Validates each response using schema
        const { value, questionId } = answer

        // Calling the service to create the answers
        await answerServiceExecute({ user, value, questionId })
      } catch (error) {
        throw new CustomError(400, "error processing responses")
      }
    }

    // Call the AnswerDetailController and get the response
    const answerDetailController = new AnswerDetailController()
    const answerDetailResponse = await answerDetailController.handle(
      request,
      reply
    )

    // Return the response from AnswerDetailController in the reply
    return reply.status(201).send(answerDetailResponse)
  }
}

export { CreateAnswerController }
