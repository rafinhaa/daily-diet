import fastify from "fastify";

interface CookieParsed {
  token: string;
  userId: string;
}

declare module "fastify" {
  interface FastifyRequest {
    sessionData: CookieParsed;
  }
}
