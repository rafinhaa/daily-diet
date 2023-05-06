import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "@/database";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

import { ResourceAlreadyExistsError } from "@/errors/resourceAlreadyExistsError";

import { registerUserBodySchema } from "./schemas";

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
