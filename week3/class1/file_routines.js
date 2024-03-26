import { promises as fsp } from "fs";

const readFileFromFSPromise = async (fname) => {
  let rawDta;
  try {
    rawDta = fsp.readFile(fname);
  } catch (error) {
    console.log(error);
  } finally {
    if (rawDta != undefined) {
      return rawDta;
    }
  }
};

const writeFileFromFSPromise = async (fname, ...rawdata) => {
  let filehandle;
  try {
    filehandle = await fsp.open(fname, "w");
    let dataToWrite = "";
    rawdata.forEach((element) => (dataToWrite += JSON.stringify(element))); // concatentate
    await fsp.writeFile(fname, dataToWrite); // returns promise
  } catch (err) {
    console.log(err);
  } finally {
    if (filehandle !== undefined) {
      await filehandle.close();
    }
  }
};

const fileStatsFromFSPromise = async (fname) => {
  let stats;
  try {
    stats = await fsp.stat(fname);
  } catch (err) {
    err.code === "ENOENT" // doesn't exist
      ? console.log("./user.json does not exist")
      : console.log(err.message);
  }

  return stats;
};

export {
  readFileFromFSPromise,
  writeFileFromFSPromise,
  fileStatsFromFSPromise,
};
