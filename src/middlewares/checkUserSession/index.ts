import { knex } from "@/database";
import { ForbiddenError } from "@/errors/ForbiddenError";
import { FastifyReply, FastifyRequest } from "fastify";
import moment from "moment";

export const checkSessionIdExists = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId)
    throw new ForbiddenError("You must be logged in to access this resource");

  const { valid, value } = req.unsignCookie(sessionId as string);

  if (!valid || !value)
    throw new ForbiddenError("You must be logged in to access this resource");

  const cookieParsed: { token: string; userId: string } = JSON.parse(value);

  const session = await knex("sessions")
    .where({
      token: cookieParsed.token,
      user_id: cookieParsed.userId,
    })
    .orderBy("created_at", "desc")
    .first();

  if (!session)
    throw new ForbiddenError("You must be logged in to access this resource");

  const expires_at = moment.utc(session.expires_at);
  const dateNowUtc = moment().utc();

  if (expires_at.isBefore(dateNowUtc)) {
    throw new ForbiddenError("You must be logged in to access this resource");
  }

  const ipHeader = Array.isArray(req.headers["x-forwarded-for"])
    ? req.headers["x-forwarded-for"][0]
    : req.headers["x-forwarded-for"];

  const ipAddress = ipHeader ?? req.ip;

  if (session.ip_address !== ipAddress)
    throw new ForbiddenError("You must be logged in to access this resource");

  req.sessionData = cookieParsed;
};
