require("dotenv").config();
require("./scripts/babel");

module.exports = require("./src/appConfig").appConfig.dbConnectionOptions;
