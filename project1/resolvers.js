import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";

import {
  loadAlerts,
  loadISOCountries,
  loadAlertsForRegion,
  loadAlertsForSubRegion,
  getallregions,
  getallsubregions
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
};

export { resolvers };
