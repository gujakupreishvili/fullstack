const fs = require("fs/promises");

const readFile = async (filename) => {
  const data = await fs.readFile(filename, "utf-8");
  return JSON.parse(data);
};
const writeFile = async (filename, data) => {
  await fs.writeFile(filename, JSON.stringify(data));
};
module.exports = { readFile, writeFile };
