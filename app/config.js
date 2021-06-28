"use strict";

const convict = require("convict");

let config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  extension: {
    api_key: {
      doc: "extension api key",
      default: "",
      env: "EXTENSION_API_KEY",
    },
    api_secret: {
      doc: "extension api secret",
      default: "",
      env: "EXTENSION_API_SECRET",
    },
    base_url: {
      doc: "extension base_url",
      default: "",
      env: "EXTENSION_BASE_URL",
    },
  },
});

// Perform validation
config.validate({ allowed: "strict" });
config = config.get();

module.exports = config;
