import * as dbRtns from "./db_routnies.js";
import * as cfg from "./config.js";
import { Router } from "express";
console.log("xxxxxxxxxxxxxxxxxxxxx")

  try {
    let db = await dbRtns.getDBInstance();
      let allJEmails = await dbRtns.findAll(db, "users");
      
    await dbRtns.addOne(allJEmails[0])
    console.log("***\nfound was " + allJEmails)
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
