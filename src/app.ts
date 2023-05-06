import fastify from "fastify";

export const app = fastify({});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});
