import { config } from "dotenv";

config();

export const countries = process.env.COUNTRIES;
export const isocountries = process.env.ISOCOUNTRIES;