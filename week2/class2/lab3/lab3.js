import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  currencyFormatter,
  provinces,
  fullNameAndProvincePromise,
  transferPaymentsFromWebPromise,
  transferPaymentForProvincePromise,
} from "./lab3_routines.js";

const argv = yargs(hideBin(process.argv))
  .options({
    firstName: {
      demandOption: true,
      alias: "fname",
      describe: "Resident’s first name",
      string: true,
    },
    lastName: {
      demandOption: true,
      alias: "lname",
      describe: "Resident’s last name",
      string: true,
    },
    province: {
      demandOption: true,
      alias: "prov",
      describe: "Resident’s home province",
      string: true,
      choices: provinces.map((province) => province.code),
    },
  })
  .help()
  .alias("help", "h")
  .parse();
chainFunction(argv.firstName, argv.lastName, argv.province);

async function chainFunction(firstName, lastName, provincialCode) {
  try {
    let result1 = await fullNameAndProvincePromise(
      firstName,
      lastName,
      provincialCode
    );

    let result2 = await transferPaymentsFromWebPromise();

    let result3 = await transferPaymentForProvincePromise(
      result2,
      provincialCode.toLowerCase()
    );

    let provinceName = provinces.find(
      (x) => x.code.toLowerCase() === provincialCode.toLowerCase()
    ).name;
    console.log(
      `${firstName}, ${lastName} lives in ${provinceName}. It received ${result3} in transfer payments.`
    );

    console.log(`\nTransfer Payments by Province Territory:\n`);

    let provinceTransfers = await Promise.allSettled(
      provinces.map((province) => {
        let provtransfer = transferPaymentForProvincePromise(
          result2,
          province.code.toLowerCase()
        );
        try {
          provtransfer.then((x) => {
            if (provincialCode.toLowerCase() === province.code.toLowerCase()) {
              console.log(
                `\x1b[1m${province.name} had a transfer payment of  ${x}`
              );
            } else {
                    console.log(
                `\x1b[0m${province.name} had a transfer payment of  ${x}`
              );
             
            }
          });
        } catch (err) {
          console.log(err);
        }
        // return rtnLib.reverseNameWithAPromise(name);
      })
    );
  } catch (err) {
    console.log(err);
  }
}

// Example usage:
// chainFunction("John", "Doe", "SK");
