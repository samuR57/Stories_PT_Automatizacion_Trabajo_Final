const { Builder, Browser } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const configuration = require("../../configuration.json");
require("chromedriver");

const chromeOptions = new Options();

module.exports = class ChromeDriver {
    constructor(configuration) {
            return (async () => {
                console.log("Creating Driver with: ", configuration)
                return await new Builder()
                .forBrowser(Browser.CHROME)
                .build();
            })();
        }
};
