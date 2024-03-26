import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";
import { Router } from "express";
const user_router = Router();
// define a default route to retrieve all users
user_router.get("/:name", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    const name = req.params.name;

    let user = await dbRtns.findOne(db, "users", { name });

      if (user == null) {
          user = "No user with "+ name +" was found"
      }
      
    res.status(200).send({ users: user });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

user_router.put("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();

    const email = req.body.email;

    console.log(email);
    let findUser = await dbRtns.findOne(db, "users", { email });

    console.log("User found:");
    console.log(findUser);

    let updateResults = await dbRtns.updateOne(
      db,
      "users",
      { email },
      req.body
    );

    console.log("User updated:");
    console.log(updateResults);

    res.status(200).send({ updateResults });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Internal server error");
  }
});

user_router.get("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let users = await dbRtns.findAll(db, "users");
    console.log(users);
    res.status(200).send({ users: users });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

user_router.delete("/:name", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    const name = req.params.name;

    let deleteResults = await dbRtns.deleteOne(db, "users", { name });

    let msg;
    if (deleteResults.deletedCount === 1) {
      msg = `User ${name} was deleted`;
    } else {
      msg = `User ${name} was not found`;
    }

    res.status(200).send({ msg });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

user_router.post("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();

    const { name, age, email } = req.body;
    let newUser = { name, age, email };
    let addUser = await dbRtns.addOne(db, "users", newUser);

    console.log("added");
    console.log(addUser);

    res.status(200).send({ msg: "Document added to users collection" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("add of user failed - internal server error");
  }
});

export default user_router;
