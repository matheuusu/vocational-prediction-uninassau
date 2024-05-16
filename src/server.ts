import { fastify } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import cors from "@fastify/cors"
import { routes } from "./routes/routes"
import { errorHandler } from "./utils/errors/error-handler"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)

const start = async () => {
  app.register(cors)
  app.register(routes)

  try {
    app
      .listen({
        host: "0.0.0.0",
        port: process.env.PORT ? Number(process.env.PORT) : 3333,
      })
      .then(() => {
        console.log(`Server is running`)
      })
  } catch (error) {
    process.exit(1)
  }
}

start()
