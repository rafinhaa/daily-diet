import { FastifyInstance } from "fastify";
import { handlerGetStats, handlerRegisterUser } from "./controller";
import { checkSessionIdExists } from "@/middlewares/checkUserSession";

export const users = async (app: FastifyInstance) => {
  app.post("/", handlerRegisterUser);
  app.get(
    "/:userId/stats",
    {
      preHandler: [checkSessionIdExists],
    },
    handlerGetStats
  );
};
