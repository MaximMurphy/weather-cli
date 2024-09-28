import createLogger from "../logger.js";
const logger = createLogger("config:mgr");

import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from "ajv";
import schema from "../config/schema.json" assert { type: "json" };
import betterAjvErrors from "better-ajv-errors";
const configLoader = cosmiconfigSync("tool", {
  searchPlaces: ["tool.config.js"],
});
const ajv = new Ajv();

const getConfig = function () {
  const result = configLoader.search(process.cwd());

  if (!result) {
    logger.warning("Could not find configuration, using default");
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning("Invalid configuration was supplied");
      console.log();
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug("Found configuration", result.config);

    return result.config;
  }
};

export default getConfig;
