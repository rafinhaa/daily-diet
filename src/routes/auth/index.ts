import { FastifyInstance } from "fastify";
import { handlerSignIn, handlerSignOut } from "./controller";
import { checkSessionIdExists } from "@/middlewares/checkUserSession";

export const auth = async (app: FastifyInstance) => {
  app.post("/signin", handlerSignIn);
  app.get(
    "/signout",
    {
      preHandler: [checkSessionIdExists],
    },
    handlerSignOut
  );
};
