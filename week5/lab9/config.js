import dotenv from "dotenv";
dotenv.config();

// export const atlas = process.env.DBURL;
// export const db = process.env.DB;
// export const collection = process.env.COLLECTION;
// export const port = process.env.PORT;
// export const graphql = process.env.GRAPHQLURL;


export default {
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  collection: process.env.COLLECTION,
  graphql : process.env.GRAPHQLURL
};