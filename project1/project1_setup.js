// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
// import * as iso from "./iso_country_routines.js";
import got from "got";
import * as iso from "./utilities.js";
import * as dbRtns from "./db_routnies.js";

async function loadISOCountries() {
  let countries = [];
  let responseMessage = "";

  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "alerts");
    responseMessage += `deleted ${results.deletedCount} documents from alerts collection. `;
    console.log(
      `deleted ${results.deletedCount} documents from alerts collection. `
    );

    let atlasAlert = [];

    let jsonAlerts = await iso.getJsonFromPromise(cfg.alerts);

    responseMessage += `Retrieved Alert JSON from remote website. `;
    console.log(`Retrieved Alert JSON from remote website.`);

    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    jsonData.forEach((element) => {
      countries.push(element);
    });

        responseMessage += `Retrieved Country JSON from GitHub. `;
    console.log(`Retrieved Country JSON from GitHub.`);

    countries.forEach((country) => {
      let currentCountryCode = country["alpha-2"];
      //   console.log(jsonAlerts.data[currentCountryCode])

      if (jsonAlerts.data[currentCountryCode]) {
        // If there's alert data, associate it with the country
        country.alertData = jsonAlerts.data[country["alpha-2"]];
        let advisoryText =
          jsonAlerts.data[currentCountryCode].eng["advisory-text"];
        let date = jsonAlerts.data[currentCountryCode]["date-published"].date;

        atlasAlert.push({
          country: country["alpha-2"],
          name: country["name"],
          text: advisoryText,
          date: date,
          region: country["region"],
          subregion: country["sub-region"],
        });
      } else {
        atlasAlert.push({
          country: country["alpha-2"],
          name: country["name"],
          text: "No travel alerts",
          date: "",
          region: country["region"],
          subregion: country["sub-region"],
        });
      }
    });

    results = await dbRtns.addMany(db, "alerts", atlasAlert);
    console.log(
      `Added ${results.insertedCount} documents to the alerts collection`
    );
    console.log("concat now!");
    responseMessage += `Added ${results.insertedCount} documents to the alerts collection`;
    console.log(responseMessage);
  } catch (err) {
    console.log(err);
  } finally {
    return {  responseMessage };
  }
}

export { loadISOCountries };

// loadISOCountries();
