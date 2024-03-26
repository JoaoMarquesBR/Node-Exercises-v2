"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { resolvers } from "./resolvers.js";
import { schema } from "./schema.js";
import cors from "@fastify/cors";
const app = Fastify();

app.register(cors, {});

app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true, // web page for to test queries
});
console.log("Server starting on port:", cfg.port);

app.listen({ port: cfg.port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});