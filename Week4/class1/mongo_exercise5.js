import * as dbRtns from "./db_routnies.js";
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"},
{"name":"John Smith", "age":24, "email": "js@abc.com"},
{"name":"Joao Marques", "age":21, "email": "jmarques@fanshaweonline.ca"} ]`;
const reloadUsers = async () => {
  let someUsers = JSON.parse(rawJSON);
  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "users");
    console.log(
      `deleted ${results.deletedCount} documents from users collection`
    );
    let resultArray = await Promise.allSettled(
      // don't await this because we don't need any results immediately
      someUsers.map((user) => dbRtns.addOne(db, "users", user))
    );
    resultArray.forEach((result) => {
      result.value.acknowledged
        ? console.log(
            `Promise ${result.status} and document added to users collection`
          )
        : console.log(
            `Promise ${result.status} and document not added to users collection`
          );
    });
    let count = await dbRtns.count(db, "users");
    console.log(
      `there are currently ${count} documents in the user collection`
    );
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
reloadUsers();
