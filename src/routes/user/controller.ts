import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "@/database";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

import { ResourceAlreadyExistsError } from "@/errors/resourceAlreadyExistsError";

import { getStatsUserParamsSchema, registerUserBodySchema } from "./schemas";
import { ResourceNotFound } from "@/errors/resourceNotFound";

export const handlerRegisterUser = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { name, email, password, avatarUrl } = registerUserBodySchema.parse(
    req.body
  );

  const userExists = await knex("users").where({ email }).first();
  if (userExists) {
    throw new ResourceAlreadyExistsError("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const [user] = await knex("users").insert(
    {
      id: randomUUID(),
      name,
      email,
      password: hash,
      avatar_url: avatarUrl,
    },
    ["id", "name", "email", "avatar_url as avatarUrl"]
  );

  return rep.status(201).send({ user });
};
export const handlerGetStats = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { userId } = getStatsUserParamsSchema.parse(req.params);

  const user = await knex("users").where({ id: userId }).first();
  if (!user) throw new ResourceNotFound("User not found");

  const meals = await knex("meals")
    .where("user_id", userId)
    .whereNull("deleted_at");

  const score = meals.reduce(
    (acc, meal) => {
      if (meal.on_the_diet) {
        acc.dietMeals++;
      } else {
        acc.nonDietMeals++;
      }
      return acc;
    },
    {
      dietMeals: 0,
      nonDietMeals: 0,
    }
  );

  const bestSequenceMeals = meals.reduce(
    (acc, meal) => {
      if (meal.on_the_diet) {
        acc.sequence++;
        acc.bestSequence =
          acc.bestSequence < acc.sequence ? acc.sequence : acc.bestSequence;
      } else {
        acc.sequence = 0;
      }
      return acc;
    },
    {
      bestSequence: 0,
      sequence: 0,
    }
  );

  return rep.status(200).send({
    stats: {
      bestSequence: bestSequenceMeals.bestSequence,
      totalMeals: meals.length,
      ...score,
      dietPercentage: (score.dietMeals / meals.length) * 100 || 0,
    },
  });
};
