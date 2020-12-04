"use strict";

const fs = require("fs");
const glob = require("glob");
const pino = require("pino");

const logger = pino({
  prettyPrint: true,
});

module.exports = {
  parse: function (buildDirectory) {
    logger.info("Parsing %s", buildDirectory);
    const contracts = [];

    let files = glob.sync(buildDirectory + "/**/*.json", {});
    // compatibility with hardhat:
    files = files.filter(
      (file) => !/(.dbg.)/.test(file) && !/(build-info)/.test(file)
    );

    for (let i = 0; i < files.length; i++) {
      const data = fs.readFileSync(files[i]);
      contracts.push(JSON.parse(data));
    }

    return contracts;
  },
};
