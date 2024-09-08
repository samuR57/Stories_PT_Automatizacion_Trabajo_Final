const { Builder, WebDriver } = require("selenium-webdriver");
const configuration = require("../../configuration.json");
const ChromeDriver = require("./chromedriver");

const browserStrategy = {
    chrome: ChromeDriver,
}

module.exports = class DriverFactory {
    /** @type {WebDriver} */
    static myDriver;
    
    constructor() {
        return (async () => {
            if (!this.myDriver) {
                console.log("starting Browser");
                DriverFactory.myDriver = await new browserStrategy[
                    configuration.browser.name.toLowerCase()
                ](configuration);
                if (configuration.browser.timeout) {
                }    
            } else {
                console.log("Driver already exists");
            }
            return DriverFactory.myDriver;
        })();
    }

    static async closeInstance() {
        console.log("Closing browser");
        await DriverFactory.myDriver.close();
        try {
            await DriverFactory.myDriver.quit();
        } catch (error) {
            console.log("Failed to close browser");
        }
        DriverFactory.myDriver = null;
        console.log("Browser closed");
    }

    static async closeDriver() {
        console.log("Closing driver");
        try {
            await DriverFactory.myDriver.close();
        } catch (error) {
            console.log("Failed to close driver");
        }
        await DriverFactory.myDriver.quit();
        DriverFactory.myDriver = null;
        console.log("Driver closed");
    }
}
