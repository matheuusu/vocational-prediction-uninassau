import { FastifyInstance, FastifyPluginOptions } from "fastify"

import { createAnswer } from "./answers/create-answer"
import { answerDetail } from "./answers/answer-detail"
import { listQuestions } from "./questions/list-questions"
import { createQuestion } from "./questions/create-question"
import { createUser } from "./users/create-user"
import { updateUser } from "./users/update-user"
import { createCourseWeight } from "./courses/create-course-weight"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Questions routes
  fastify.register(listQuestions)
  fastify.register(createQuestion)

  // Answers routes
  fastify.register(createAnswer)
  fastify.register(answerDetail)

  // Users routes
  fastify.register(createUser)
  fastify.register(updateUser)

  // Courses routes
  fastify.register(createCourseWeight)
}
