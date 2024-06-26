import * as rtnLib from "./file_routines.js";
import * as cfg from "./config.js";

const dotEnvWrite = async () => {
  try {
    let fileStats = await rtnLib.fileStatsFromFSPromise(cfg.userobjects);

    if (!fileStats) {
      let users = [];
      let rawData = await readFileFromFSPromise("users.txt");

      rawData
        .toString()
        .split("\r\n")
        .forEach((user) => {
          if (user.length > 0) {
            let userJson = { username: user, email: user + "@abc.com" };
            users.push(userJson);
          }
        });

      await rtnLib.writeFileFromFSPromise(cfg.userobjects, users);
      console.log(`${cfg.userobjects} file written to file system`);
    } else {
      console.log(`${cfg.userobjects} already exists`);
    }
  } catch (err) {
    console.log(err);
    console.log("user json not written to file system");
  }
};

dotEnvWrite();
