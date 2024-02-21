import { config } from "dotenv";

config();

export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const alerts = process.env.GOCALERTS;
export const countries = process.env.ISOCOUNTRIES;
export const alertCollection = process.env.ALERTCOLLECTION;
export const travelalert = process.env.TRAVELALERT;
export const port = process.env.PORT;

