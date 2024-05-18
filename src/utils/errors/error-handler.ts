import { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { BadRequest } from "./bad-request"

type fastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: fastifyErrorHandler = (error, request, reply) => {
  console.log(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequest) {
    return reply.send({ message: error.message })
  }

  return reply.status(500).send({ message: error.message })
}
