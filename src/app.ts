import fastify from "fastify";
import { env } from "./env";

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

app.get("/", async (req, res) => {
  res.send("Hello World!");
});
