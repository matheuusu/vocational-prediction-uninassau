import { fastify } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import cors from "@fastify/cors"
import { routes } from "./routes"

const app = fastify({ logger: true })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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
        console.log("server is running")
      })
  } catch (error) {
    process.exit(1)
  }
}

start()
