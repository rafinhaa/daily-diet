import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "@/database";
import {
  createMealBodySchema,
  createMealParamsSchema,
  deleteMealParamsSchema,
  getAllMealsParamsSchema,
  getMealParamsSchema,
} from "./schemas";
import { randomUUID } from "node:crypto";
import { ResourceNotFound } from "@/errors/resourceNotFound";

export const handlerCreateMeal = async (
  req: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  rep: FastifyReply
) => {
  const { description, name, eatedAt, onTheDiet } = createMealBodySchema.parse(
    req.body
  );
  const { userId } = createMealParamsSchema.parse(req.params);

  const [meal] = await knex("meals").insert(
    {
      id: randomUUID(),
      name,
      description,
      eated_at: eatedAt,
      on_the_diet: onTheDiet,
      user_id: userId,
    },
    [
      "id",
      "name",
      "description",
      "eated_at as eatedAt",
      "on_the_diet as onTheDiet",
      "created_at as createdAt",
    ]
  );

  return rep.status(201).send({ meal });
};

export const handlerDeleteMeal = async (
  req: FastifyRequest<{
    Params: {
      mealId: string;
    };
  }>,
  rep: FastifyReply
) => {
  const { mealId } = deleteMealParamsSchema.parse(req.params);

  const meal = await knex("meals")
    .where({ id: mealId })
    .whereNull("deleted_at")
    .first();
  if (!meal) throw new ResourceNotFound("Meal not found");

  await knex("meals")
    .update({
      deleted_at: knex.fn.now(),
    })
    .where({ id: mealId });

  return rep.status(200).send();
};

export const handlerUpdateMeal = async (
  req: FastifyRequest<{
    Params: {
      mealId: string;
    };
  }>,
  rep: FastifyReply
) => {
  const { mealId } = deleteMealParamsSchema.parse(req.params);

  const resourceExists = await knex("meals").where({ id: mealId }).first();
  if (!resourceExists) throw new ResourceNotFound("Meal not found");

  const { description, name, eatedAt, onTheDiet } = createMealBodySchema.parse(
    req.body
  );

  const [meal] = await knex("meals").update(
    {
      name,
      description,
      eated_at: eatedAt,
      on_the_diet: onTheDiet,
      updated_at: knex.fn.now(),
    },
    [
      "id",
      "name",
      "description",
      "eated_at as eatedAt",
      "on_the_diet as onTheDiet",
      "updated_at as updatedAt",
      "created_at as createdAt",
    ]
  );

  return rep.status(200).send({ meal });
};

export const handlerGetAllMeals = async (
  req: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  rep: FastifyReply
) => {
  const { userId } = getAllMealsParamsSchema.parse(req.params);

  const meals = await knex("meals")
    .select([
      "id",
      "name",
      "description",
      "eated_at as eatedAt",
      "on_the_diet as onTheDiet",
      "created_at as createdAt",
      "updated_at as updatedAt",
    ])
    .where({ user_id: userId })
    .whereNull("deleted_at");

  return rep.status(200).send({ meals });
};

export const handlerGetMeal = async (
  req: FastifyRequest<{
    Params: {
      mealId: string;
    };
  }>,
  rep: FastifyReply
) => {
  const { mealId } = getMealParamsSchema.parse(req.params);

  const [meal] = await knex("meals")
    .select([
      "id",
      "name",
      "description",
      "eated_at as eatedAt",
      "on_the_diet as onTheDiet",
      "created_at as createdAt",
      "updated_at as updatedAt",
    ])
    .where({ id: mealId })
    .whereNull("deleted_at");

  if (!meal) throw new ResourceNotFound("Meal not found");

  return rep.status(200).send({ meal });
};
