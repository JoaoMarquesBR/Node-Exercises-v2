import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
import * as iso from "./iso_country_routines.js";
import got from "got";

// Note: hideBin is a shorthand for process.argv.slice(2)
// - bypass the first two arguments
const argv = yargs(hideBin(process.argv))
  .options({
    refresh: {
      demandOption: false,
      describe: "User wants a fresh download of data",
      boolean: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

const baseFunction = async () => {
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

      console.log(
        "An existing " + cfg.countries + " was read from the file system"
      );
      console.log(cfg.countries + " was created on " + fileStats.birthtime);
      console.log("There are " + codeQuantity + " in " + cfg.countries);
    }
  } catch (err) {
    console.log(err.message);
  }
};

baseFunction();
