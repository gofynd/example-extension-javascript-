'use strict';

const { setupFdk } = require("fdk-extension-javascript/express");
const { MemoryStorage } = require("fdk-extension-javascript/express/storage");
const config =  require("../config");

let fdkExtension = setupFdk({
    api_key: config.extension.api_key,
    api_secret: config.extension.api_secret,
    base_url: config.extension.base_url,
    scopes: ["company/product"],
    callbacks: {
        auth: async (req) => {
            // Writee you code here to return initial launch url after suth process complete
           return req.extension.base_url;
        },
        
        uninstall: async (req) => {
            // Write your code here to cleanup data related to extension
            // If task is time taking then process it async on other process.
        }
    },
    storage: new MemoryStorage("v1:"),
    access_mode: "offline",
    // cluster: "https://api.fyndx0.de" // this is optional by default it points to prod.
});


module.exports = fdkExtension;