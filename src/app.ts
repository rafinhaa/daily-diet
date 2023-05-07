import fastify from "fastify";
import { env } from "./env";

import { users } from "@/routes/user";
import { ZodError } from "zod";
import { BaseError } from "@/errors/baseError";
import { meals } from "./routes/meal";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

export const app = fastify({
  logger: envToLogger[env.NODE_ENV],
});

app.register(users, { prefix: "/user" });
app.register(meals, { prefix: "/meal" });

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "production") console.error(error);

  if (error instanceof ZodError)
    return reply.status(400).send({
      statusCode: 400,
      error: "Validation error",
      message: error.format(),
    });

  if (error instanceof BaseError)
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.error,
      message: error.message,
    });

  reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Ocorreu um erro interno",
  });
});
