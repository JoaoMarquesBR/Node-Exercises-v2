import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";
// define a default route to retrieve all users
async function routes(fastify, options) {
  fastify.get("/api/countries", async (request, reply) => {
    try {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

      let db = await dbRtns.getDBInstance();
      console.log("******************");
      console.log(cfg.default);
      let users = await dbRtns.findAll(db, cfg.default.collection);
      reply.status(200).send({ users: users });
    } catch (err) {
      console.log(err.stack);
      reply.status(500).send("get all users failed - internal server error");
    }
  });
}

export { routes };
