/*
  Filename: hjson.loader.js
  Description: This is a "loader" script which converts .hjson files to .json during the build
               process.  This is so we can include comments in our feature.json files.

               See https://webpack.js.org/contribute/writing-a-loader/#root for info
               about writing a webpack loader.
*/

const Hjson = require("hjson");

module.exports = function (fileContents) {
  const JSON_DATA = Hjson.parse(fileContents);
  return `export default ${JSON.stringify(JSON_DATA)}`;
};
