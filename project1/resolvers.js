import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js"

import {
  loadAlerts,
  loadISOCountries,
  loadAlertsForRegion,
  loadAlertsForSubRegion,
  getallregions,
  getallsubregions,
  addAdvisory,
  getalladviseries
} from "./project1_setup.js";

const resolvers = {
  project1_setup: async () => {
    try {
      const result = await loadISOCountries();
      return { result: result.responseMessage };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  alerts: async () => {
    try {
      const alerts = await loadAlerts();
      console.log(alerts.length);
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  alertsforregion: async (args) => {
    try {
      const alerts = await loadAlertsForRegion(args.region);
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  alertsforsubregion: async (args) => {
    try {
      const alerts = await loadAlertsForSubRegion(args.subregion);
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  regions: async () => {
    try {
      const alerts = await getallregions();
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  subregions: async () => {
    try {
      const alerts = await getallsubregions();
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  addOneAdvisory: async (object) =>{
    try{
      const newAdv = await addAdvisory(object);
      return newAdv;
    }catch(error){
      console.log(error)
    }
  },
  adviseries:async()=>{
    try {
      const alerts = await getalladviseries();
      return alerts;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
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
    let db = await dbRtns.getDBInstance();
    let user = { name: args.name, age: args.age, email: args.email };
    console.log("adding")
    console.log(user)
    console.log(cfg)
    console.log("x")
      let results = await dbRtns.addOne(db, "users", user);
      console.log(results)
    return results.acknowledged != null  ? user : null;
  },
};

export { resolvers };
