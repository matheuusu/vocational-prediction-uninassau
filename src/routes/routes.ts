import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify"

import { ZodTypeProvider } from "fastify-type-provider-zod"

import { ListQuestionsController } from "../controllers/questions/ListQuestionsController"
import { CreateQuestionController } from "../controllers/questions/CreateQuestionController"
import { ListAnswersController } from "../controllers/answers/ListAnswersController"
import { AnswerDetailsController } from "../controllers/answers/AnswerDetailsController"
import { registerAnswer } from "./register-answer"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/questions",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListQuestionsController().handle(request, reply)
    }
  )

  fastify.post(
    "/question",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateQuestionController().handle(request, reply)
    }
  )

  fastify.get(
    "/answers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListAnswersController().handle(request, reply)
    }
  )

  fastify.register(registerAnswer)

  fastify.get(
    "/answer-detail",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AnswerDetailsController().handle(request, reply)
    }
  )
}
