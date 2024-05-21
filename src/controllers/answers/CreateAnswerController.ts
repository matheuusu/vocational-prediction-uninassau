import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAnswerService } from "../../services/answers/CreateAnswerService"
import { BadRequest } from "../../utils/errors/bad-request"
import { FindQuestionService } from "../../services/questions/FindQuestionService"
import { CreateUserService } from "../../services/users/CreateUserService"
import { DetailScore } from "../../utils/courseScore"

// Define the expected number of responses
const answersExpected = 10

class CreateAnswerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userName, answers } = request.body as {
      userName: string
      answers: { value: number; questionId: string }[]
    }

    // Create a new user
    const { execute: createUserService } = new CreateUserService()
    const user = await createUserService({ userName })

    // Checks whether the number of responses is as expected
    if (answers.length !== answersExpected) {
      throw new BadRequest("Incorrect number of responses received")
    }

    const { execute: createAnswerService } = new CreateAnswerService()
    const { execute: findQuestionService } = new FindQuestionService()

    // Scroll through responses for validation and creation
    for (const answer of answers) {
      try {
        // Validates each response using schema
        const { value, questionId } = answer

        const question = findQuestionService({ questionId })

        if (!question) {
          throw new BadRequest("Question with the provided ID does not exist")
        }

        // Calling the service to create the answers
        await createAnswerService({ value, userId: user.id, questionId })
      } catch (error) {
        throw new BadRequest("Error processing responses")
      }
    }

    // Call the DetailScore and get the response
    const { handle: detailScore } = new DetailScore()
    const courseScores = await detailScore({ userId: user.id })

    // Return the response from DetailScore in the reply
    return reply.status(201).send({
      courseScores: courseScores.map((course) => {
        return {
          id: course.courseId,
          course: course.course,
          score: course.score,
        }
      }),
    })
  }
}

export { CreateAnswerController }
