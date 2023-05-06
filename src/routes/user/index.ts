import { FastifyInstance } from "fastify";
import { handlerRegisterUser } from "./controller";

export const users = async (app: FastifyInstance) => {
  app.post("/", handlerRegisterUser);
};
