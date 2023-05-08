import { knex } from "@/database";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { FastifyReply, FastifyRequest } from "fastify";
import moment from "moment";

export const checkSessionIdExists = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );

  const { valid, value } = req.unsignCookie(sessionId as string);

  if (!valid || !value)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );

  const session = await knex("sessions")
    .where({
      token: value,
    })
    .orderBy("created_at", "desc")
    .first();

  if (!session)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );

  const expires_at = moment.utc(session.expires_at);
  const dateNowUtc = moment().utc();

  if (expires_at.isBefore(dateNowUtc)) {
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );
  }

  if (session.ip_address !== req.ip)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );
};
