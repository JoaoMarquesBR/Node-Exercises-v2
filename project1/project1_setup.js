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
    return { responseMessage };
  }
}

async function loadAlerts() {
  let countries = [];
  let responseMessage = "";
  let atlasAlert = [];

  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "alerts");

    let jsonAlerts = await iso.getJsonFromPromise(cfg.alerts);

    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    jsonData.forEach((element) => {
      countries.push(element);
    });

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
  } catch (err) {
    console.log(err);
  } finally {
    console.log(atlasAlert.length);
    return atlasAlert;
  }
}

async function loadAlertsForRegion(region) {
  let countries = [];
  let atlasAlert = [];

  try {
    const db = await dbRtns.getDBInstance();
    let jsonAlerts = await iso.getJsonFromPromise(cfg.alerts);
    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    jsonData.forEach((element) => {
      if (element.region === region) {
        countries.push(element);
      }
    });

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
  } catch (err) {
    console.log(err);
  } finally {
    console.log(atlasAlert.length);
    return atlasAlert;
  }
}

async function loadAlertsForSubRegion(subregion) {
  let countries = [];
  let atlasAlert = [];

  try {
    const db = await dbRtns.getDBInstance();
    let jsonAlerts = await iso.getJsonFromPromise(cfg.alerts);
    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    console.log(subregion);
    jsonData.forEach((element) => {
      // console.log(element)
      console.log(element["sub-region"] + " and " + subregion);
      if (element["sub-region"] === subregion) {
        countries.push(element);
      }
    });

    console.log("checking " + countries.length);

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
  } catch (err) {
    console.log(err);
  } finally {
    console.log(atlasAlert.length);
    return atlasAlert;
  }
}

async function getallregions() {
  let atlasAlert = [];
  let uniqueRegions = [];

  try {
    const db = await dbRtns.getDBInstance();
    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    jsonData.forEach((element) => {
      if (!uniqueRegions.includes(element.region)) {
        uniqueRegions.push(element.region);
      }
    });

    results = await dbRtns.addMany(db, "alerts", atlasAlert);
  } catch (err) {
    console.log(err);
  } finally {
    console.log(uniqueRegions.length);
    return uniqueRegions;
  }


}

async function getallsubregions() {
  let atlasAlert = [];
  let uniqueSubRegions = [];

  try {
    const db = await dbRtns.getDBInstance();
    let jsonData = await iso.getJsonFromPromise(cfg.countries);

    jsonData.forEach((element) => {
      if (!uniqueSubRegions.includes(element["sub-region"])) {
        uniqueSubRegions.push(element["sub-region"]);
      }
    });

    results = await dbRtns.addMany(db, "alerts", atlasAlert);
  } catch (err) {
    console.log(err);
  } finally {
    console.log(uniqueSubRegions.length);
    return uniqueSubRegions;
  }


}

async function addAdvisory(advisory) {
  console.log("addadvisory")
  try {
    const db = await dbRtns.getDBInstance();

    console.log("trying to add .")
    console.log(advisory)
    let resp = await dbRtns.addOne(db, cfg.adviseriescollection, advisory)
    const insertedAdvisory = { ...advisory, _id: resp.insertedId };

    console.log(insertedAdvisory)
    return insertedAdvisory;
  } catch (error) {
    console.log(error)
  }
}

async function getalladviseries() {
  let atlasAlert = [];
  let uniqueSubRegions = [];
  console.log("getting all adverseries")

  try {
    const db = await dbRtns.getDBInstance();
    let dbResponse = await dbRtns.findAll(db, cfg.adviseriescollection);
    return dbResponse;
  } catch (err) {
    console.log(err);
  }

}

export {
  loadISOCountries,
  loadAlerts,
  loadAlertsForRegion,
  loadAlertsForSubRegion,
  getallregions,
  getallsubregions,
  addAdvisory,
  getalladviseries
};

// loadISOCountries();
