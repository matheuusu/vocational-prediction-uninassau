import { FastifyInstance, FastifyPluginOptions } from "fastify"

import { registerAnswer } from "./answers/register-answer"
import { listAnswers } from "./answers/list-answers"
import { answerDetail } from "./answers/answer-detail"
import { listQuestions } from "./questions/list-questions"
import { createQuestion } from "./questions/create-question"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Questions routes
  fastify.register(listQuestions)
  fastify.register(createQuestion)

  // Answers routes
  fastify.register(listAnswers)
  fastify.register(registerAnswer)
  fastify.register(answerDetail)
}
