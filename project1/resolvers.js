import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";

import { loadISOCountries } from "./project1_setup.js";

const resolvers = {
  project1_setup: async () => {
    try {
      const result = await loadISOCountries();
      console.log("*****************************************************");
      console.log("returning " + result.responseMessage);
      return { result: result.responseMessage };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export { resolvers };

