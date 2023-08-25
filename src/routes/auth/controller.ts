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

  const sessionObject = JSON.stringify({
    token: sessionId,
    userId: user.id,
  });

  const ipHeader = Array.isArray(req.headers["x-forwarded-for"])
    ? req.headers["x-forwarded-for"][0]
    : req.headers["x-forwarded-for"];

  const ipAddress = ipHeader ?? req.ip;

  await knex("sessions").insert({
    id: randomUUID(),
    user_id: user.id,
    token: sessionId,
    ip_address: ipAddress,
    expires_at: knex.raw(`datetime('now', '+${expiresInSeconds} seconds')`),
  });

  rep.cookie("sessionId", sessionObject, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    maxAge: expiresInMiliSeconds,
    signed: true,
  });

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return rep.status(200).send({ user: userResponse });
};

export const handlerSignOut = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { userId, token } = req.sessionData;

  await knex("sessions")
    .update({
      expires_at: knex.fn.now(),
    })
    .where({
      token,
      user_id: userId,
    })
    .orderBy("created_at", "desc");

  rep.clearCookie("sessionId", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    maxAge: 0,
    signed: true,
  });

  return rep.status(200).send();
};
