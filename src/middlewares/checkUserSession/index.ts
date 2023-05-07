import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { FastifyReply, FastifyRequest } from "fastify";

export const checkSessionIdExists = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );

  const unsignedValue = req.unsignCookie(sessionId as string);

  if (!unsignedValue)
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );
};
