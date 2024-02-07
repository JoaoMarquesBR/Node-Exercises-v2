import dotenv from "dotenv";
dotenv.config();
// DBURL=mongodb+srv://jmarques:galofrito@cluster0-javascript.bp6xn7x.mongodb.net/?retryWrites=true&w=majority
// DB=info3139db
// ISOCOUNTRIES=https://raw.githubusercontent.com/elauersen/info3139/master/isocountries.json
// COLLECTION=countries

// import { config } from "dotenv";

// config();

// export const countries = process.env.COUNTRIES;
// export const isocountries = process.env.ISOCOUNTRIES;
export const countries = process.env.COUNTRIES;
export const isocountries = process.env.ISOCOUNTRIES;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;

// export default {
//   atlas: process.env.DBURL,
//   appdb: process.env.DB,
//   ISOCOUNTRIES: process.env.ISOCONTRIES,
//   COLLECTION: process.env.countries
// };