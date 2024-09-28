#!/usr/bin/env node
import createLogger from "../src/logger.js";
const logger = createLogger("bin");
import arg from "arg";
import chalk from "chalk";
import getConfig from "../src/commands/config-mgr.js";
import start from "../src/commands/start.js";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });
  logger.debug("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
