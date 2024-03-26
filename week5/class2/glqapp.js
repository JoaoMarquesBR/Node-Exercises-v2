"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { resolvers } from "./resolvers.js";
import { schema } from "./schema.js";
import cors from "@fastify/cors";
const app = Fastify();
app.register(mercurius, {
schema,
resolvers,
graphiql: true, // web page for to test queries
});

app.register(cors, {});

app.listen({ port: cfg.default.port }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on port ${cfg.default.port}`);
  });