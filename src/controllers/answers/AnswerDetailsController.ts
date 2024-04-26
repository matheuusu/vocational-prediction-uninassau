import { FastifyRequest, FastifyReply } from "fastify"
import { AnswerDetailsService } from "../../services/answers/AnswerDetailsService"
import { SelectAnswerService } from "../../services/answers/SelectAnswerService"

class AnswerDetailsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { execute: detailsServiceExecute } = new AnswerDetailsService()

      // calling the calculateTraitAndValue method to obtain the area of ​​interest
      const { trait, value } = await this.calculateTraitAndValue()

      // calling the AnswerDetailsService to get the details based on the area of ​​interest
      const details = await detailsServiceExecute({ trait })

      return reply.send(details)
    } catch (error) {
      return reply.status(500).send("Internal Server Erro")
    }
  }

  // method for calculating the highest scoring area of ​​interest
  async calculateTraitAndValue() {
    const { execute: selectAnswerServiceExecute } = new SelectAnswerService()

    // calling SelectAnswerService to get user responses
    const answers = await selectAnswerServiceExecute()

    // calculates the score for each area of ​​interest
    const career = answers.reduce((acc, answer) => {
      acc[answer.question.trait] =
        (acc[answer.question.trait] || 0) + answer.value
      return acc
    }, {} as { [key: string]: number })

    let trait: string | undefined
    let mostValue: number | undefined

    // finds the area of ​​interest with the highest score
    for (const key in career) {
      if (mostValue === undefined || career[key] > mostValue) {
        trait = key
        mostValue = career[key]
      }
    }

    return { trait, value: mostValue }
  }
}

export { AnswerDetailsController }
