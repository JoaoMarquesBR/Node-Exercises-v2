import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";
const resolvers = {
  countries: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.default.collection, {}, {});
  },
  countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.default.collection, {
      code: args.code,
    });
  },
  addcountry: async (args) => {
    let db = await dbRtns.getDBInstance();
    let user = { name: args.name, code: args.code };
      let results = await dbRtns.addOne(db, cfg.default.collection, user);
      console.log(results)
    return results.acknowledged != null  ? user : null;
  },
};
export { resolvers };
