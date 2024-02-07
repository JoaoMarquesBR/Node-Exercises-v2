import { config } from "dotenv";

config();

export const alerts = process.env.GOCALERTS;
export const countries = process.env.ISOCOUNTRIES;
export const alertCollection = process.env.ALERTCOLLECTION;
export const travelalert = process.env.TRAVELALERT;

