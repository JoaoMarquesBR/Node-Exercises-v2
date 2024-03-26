import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
import * as iso from "./iso_country_routines.js";
import * as dbRtns from "./db_routnies.js";
import { port } from "./config.js";
import express from "express";
import router from "./routes.js";

let inputCountryCode;

// Note: hideBin is a shorthand for process.argv.slice(2)
// - bypass the first two arguments
const argv = yargs(hideBin(process.argv))
  .options({
    refresh: {
      demandOption: false,
      describe: "User wants a fresh download of data",
      boolean: true,
    },
    code: {
      demandOption: true,
      describe: "Country code in XX format",
      string: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

const baseFunction = async (inputCode) => {
  inputCountryCode = inputCode
  try {
    let fileStats = await iso.fileStatsFromFSPromise(cfg.countries);
    let jsonCountries = "";
    let codeQuantity = 0;

    if (fileStats === undefined || argv.refresh) {
      jsonCountries = await iso.getJSONFromWWWPromise(cfg.isocountries);
      let countryList = [];

      await Promise.all(
        jsonCountries.map(async (country) => {
          countryList.push(country);
        })
      );

      codeQuantity = countryList.length;

      await iso.writeFileFromFSPromise(cfg.countries, countryList);

      fileStats = await iso.fileStatsFromFSPromise(cfg.countries);

      console.log("A new " + cfg.countries + " file was written.");
      console.log(cfg.countries + " was created on " + fileStats.birthtime);
      console.log("There are " + codeQuantity + " in " + cfg.countries);
    } else {
      jsonCountries = await iso.getJSONFromWWWPromise(cfg.isocountries);
      let countryList = [];

      await Promise.all(
        jsonCountries.map(async (country) => {
          countryList.push(country);
        })
      );
      codeQuantity = countryList.length;

      let newArr = countryList.map((x) => ({
        name: x.name,
        code: x["alpha-2"],
      }));

      let result = await bulkLoadAndFindByCriteria(newArr);
      return result
    }
  } catch (err) {
    console.log(err.message);
  }
};

const bulkLoadAndFindByCriteria = async (inputList) => {
  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "countries");
  console.log(
      `there are currently ${results.deletedCount} documents in the countries collection`
    );

    console.log(
      `deleted ${results.deletedCount} documents from countries in the countries collection`
    );

    results = await dbRtns.addMany(db, "countries", inputList);
    console.log(
      `There are now ${results.insertedCount} documents currently in the countries collection`
    );

    let allJEmails = await dbRtns.findAll(
      db,
      "countries",
      { code: inputCountryCode }, // only have addresses contain a j - criteria
      { name: 1, code: 1 } // only return the email field - projection
    );
  
    let whoItBelongs = `The code  ${inputCountryCode}  is not a known country alpha-2 code`

    allJEmails.forEach((country) =>
      whoItBelongs = `The code ${inputCountryCode} belongs to the country of ${country.name}`
    );

    console.log(whoItBelongs)

    return whoItBelongs
    // process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};


const app = express();

app.get("/", (req, res) => {
res.send("\n\nHello world!\n\n");
});
app.listen(port, () => {
console.log(`listening on port ${port}`);
});


app.use("/api/codelookup", router);

export {baseFunction}