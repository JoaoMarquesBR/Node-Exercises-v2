import dotenv from "dotenv";
dotenv.config();

export default {
  atlas: process.env.DBURL,
  appdb: process.env.DB
};