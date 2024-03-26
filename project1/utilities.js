import got from "got"

const getJsonFromPromise = (url) => got(url).json();

export {getJsonFromPromise}