import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "@/database";
import bcrypt from "bcryptjs";

import { handleSignInBodySchema } from "./schemas";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { randomUUID } from "node:crypto";
import { env } from "@/env";

export const handlerSignIn = async (req: FastifyRequest, rep: FastifyReply) => {
  const { email, password } = handleSignInBodySchema.parse(req.body);

  const user = await knex("users").where({ email }).first();
  if (!user) {
    throw new UnauthorizedError();
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new UnauthorizedError();
  }

  const sessionId = randomUUID();
  const expiresInSeconds = env.COOKIE_EXPIRES_IN_MINUTES * 60;
  const expiresInMiliSeconds = env.COOKIE_EXPIRES_IN_MINUTES * 60 * 1000;

  await knex("sessions").insert({
    id: randomUUID(),
    user_id: user.id,
    token: sessionId,
    ip_address: req.ip,
    expires_at: knex.raw(`datetime('now', '+${expiresInSeconds} seconds')`),
  });

  rep.cookie("sessionId", sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresInMiliSeconds,
    signed: true,
  });

  return rep.status(200).send();
};

export const handlerSignOut = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  rep.clearCookie("sessionId", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    signed: true,
  });

  return rep.status(200).send();
};
