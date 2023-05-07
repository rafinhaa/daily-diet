import { FastifyInstance } from "fastify";
import {
  handlerCreateMeal,
  handlerDeleteMeal,
  handlerGetAllMeals,
  handlerGetMeal,
  handlerUpdateMeal,
} from "./controller";
import { checkSessionIdExists } from "@/middlewares/checkUserSession";

export const meals = async (app: FastifyInstance) => {
  app.addHook("preHandler", checkSessionIdExists);

  app.post("/:userId", handlerCreateMeal);
  app.delete("/:mealId", handlerDeleteMeal);
  app.patch("/:mealId", handlerUpdateMeal);
  app.get("/:userId/all", handlerGetAllMeals);
  app.get("/:mealId", handlerGetMeal);
};
