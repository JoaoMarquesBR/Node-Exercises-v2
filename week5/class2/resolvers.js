import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";
const resolvers = {
  users: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.default.collection, {}, {});
  },
  userbyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.default.collection, {
      name: args.name,
    });
  },
  adduser: async (args) => {
    console.log("adding")
    let db = await dbRtns.getDBInstance();
    let user = { name: args.name, age: args.age, email: args.email };
      let results = await dbRtns.addOne(db, cfg.default.collection, user);
      console.log(results)
    return results.acknowledged != null  ? user : null;
  },
};
export { resolvers };
