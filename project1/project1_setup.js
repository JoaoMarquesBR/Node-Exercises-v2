
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
// import * as iso from "./iso_country_routines.js";
import got from "got";
import * as iso from "./utilities.js";



async function loadISOCountries ()  {
    let countries = []
    let alerts = []

    let jsonData = await iso.getJsonFromPromise(cfg.countries)

    jsonData.forEach(element => {
        countries.push(element)
    });

    let jsonAlerts = await iso.getJsonFromPromise(cfg.alerts)


    console.log("Retrieved Alert JSON from remote web site.")

    console.log("Retrieved Country JSON from remote web site")

    console.log("There are "+ Object.keys(jsonAlerts.data).length +" alerts and "+ countries.length+" countries")
        
        
}

loadISOCountries();