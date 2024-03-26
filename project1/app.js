import mercurius from "mercurius";
import * as cfg from "./config.js";
import Fastify from "fastify";
import fastifyStatic from '@fastify/static';
// import fastifyCors from 'fastify-cors'; 
import fastifyCors from '@fastify/cors'; // Change this line

import path from "path"
import { fileURLToPath } from "url";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = Fastify()

app.register(fastifyCors, {
  origin: true, 
});

app.register(mercurius,{
  schema,
  resolvers,
  graphiql:true
});

console.log("Starting server...");

app.listen({ port: cfg.port }, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server started successfully, listening on port", cfg.port);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Path to static files:", path.join(__dirname, "public"));

app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

app.get("/", (req, reply) => {
  console.log("Received request for /");
  reply.sendFile("index.html");
});

app.setNotFoundHandler((req, res) => {
 res.sendFile("index.html");
});
