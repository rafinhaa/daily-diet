import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import { env } from "./env";

import { users } from "@/routes/user";
import { ZodError } from "zod";
import { BaseError } from "@/errors/baseError";
import { meals } from "./routes/meal";
import { auth } from "./routes/auth";

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
  production: {
    serializers: {
      res: (res: FastifyReply) => ({
        statusCode: res.statusCode,
      }),
      req: (req: FastifyRequest) => ({
        ip: req.headers["x-forwarded-for"] || req.ip,
        method: req.method,
        url: req.url,
        hostname: req.hostname,
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
      }),
    },
  },
  test: false,
};

export const app = fastify({
  logger: envToLogger[env.NODE_ENV],
});

app.register(cookie, {
  secret: env.COOKIE_SECRET,
} as FastifyCookieOptions);

app.register(users, { prefix: "/user" });
app.register(meals, { prefix: "/meal" });
app.register(auth, { prefix: "/auth" });

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
