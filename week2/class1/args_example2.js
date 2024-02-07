const provinces = {
  on: "Ontario",
  bc: "British Columbia",
  ab: "Alberta",
};
let idx, val;
for ([idx, val] of process.argv.entries()) {
  if (idx > 1 && idx < process.argv.length) {
    provinces[val]
      ? console.log(`We've entered an argument for ${provinces[val]}`)
      : console.log(`Argument ${val} is not a valid argument`);
  }
}
