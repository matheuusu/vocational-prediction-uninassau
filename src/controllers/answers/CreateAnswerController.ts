import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAnswerService } from "../../services/answers/CreateAnswerService"
import { BadRequest } from "../../utils/errors/bad-request"
import { AnswerDetailController } from "./AnswerDetailController"
import { FindQuestionService } from "../../services/questions/FindQuestionService"

// Define the expected number of responses
const answersExpected = 10

class CreateAnswerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { answers } = request.body as {
      answers: { value: number; questionId: string }[]
    }

    const { user } = request.query as { user: string }

    // Checks whether the number of responses is as expected
    if (answers.length !== answersExpected) {
      throw new BadRequest("Incorrect number of responses received")
    }

    const { execute: answerServiceExecute } = new CreateAnswerService()
    const { execute: findQuestionExecute } = new FindQuestionService()

    // Scroll through responses for validation and creation
    for (const answer of answers) {
      try {
        // Validates each response using schema
        const { value, questionId } = answer

        const question = findQuestionExecute({ questionId })

        if (!question) {
          throw new BadRequest("Question with the provided ID does not exist")
        }

        // Calling the service to create the answers
        await answerServiceExecute({ user, value, questionId })
      } catch (error) {
        throw new BadRequest("Error processing responses")
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
