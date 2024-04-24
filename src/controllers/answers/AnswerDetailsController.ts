import { FastifyRequest, FastifyReply } from "fastify"
import { ListAnswersService } from "../../services/answers/ListAnswersService"
import { AnswerDetailsService } from "../../services/answers/AnswerDetailsService"
import { SelectAnswerService } from "../../services/answers/SelectAnswerService"

class AnswerDetailsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const career: { [key: string]: number } = {}

    // const listAnswersService = new ListAnswersService()
    // const answers = await listAnswersService.execute()

    const selectAnswerService = new SelectAnswerService()
    const selectAnswer = await selectAnswerService.execute()

    selectAnswer.forEach((answer) => {
      if (!career[`${answer.question.trait}`]) {
        career[`${answer.question.trait}`] = answer.value
      } else {
        career[`${answer.question.trait}`] += answer.value
      }
    })

    let trait: string | undefined
    let mostValue: number | undefined

    for (const key in career) {
      const value = career[key]
      if (mostValue === undefined || mostValue <= value) {
        mostValue = value
        trait = key
      }
    }

    const detailsService = new AnswerDetailsService()
    const details = await detailsService.execute({ trait })

    return reply.send(details)
  }
}

export { AnswerDetailsController }
