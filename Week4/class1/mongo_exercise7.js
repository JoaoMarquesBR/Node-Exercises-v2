import * as dbRtns from "./db_routnies.js";
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"},
{"name":"John Smith", "age":24, "email": "js@abc.com"},
{"name":"Joao Marques", "age":21, "email": "jmarques@fanshaweonline.ca"} ]`;
const bulkLoadUsersAndFindOne = async () => {
  let someUsers = JSON.parse(rawJSON);
  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "users");
    console.log(
      `deleted ${results.deletedCount} documents from users collection`
    );
    results = await dbRtns.addMany(db, "users", someUsers);
    console.log(
      `added ${results.insertedCount} documents to the user collection`
    );
    let someUser = await dbRtns.findOne(db, "users", { name: "Joao Marques" });
    console.log(
      `User ${someUser.name} was found. This user's email address is ${someUser.email}`
    );
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
bulkLoadUsersAndFindOne();
// processDb();
