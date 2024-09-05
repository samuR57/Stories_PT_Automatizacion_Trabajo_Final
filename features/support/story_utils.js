const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const { until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const configuration = require("../../configuration.json");

class StoryUtils {
    static async createStory(title, description) {
        console.log(`Creating story with title "${title}" and description "${description}"`);
        
        const backlogTabInactive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabInactive);
        if (backlogTabInactive.length > 0) {
            await backlogTabInactive[0].click();
        }

        await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addStoryButton), 10000);
        const addStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.addStoryButton);
        await addStoryButton.click();

        const storyTitleInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyTitleInput), 10000);
        await storyTitleInput.sendKeys(title);

        const storyDescriptionInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyDescriptionInput), 10000);
        await storyDescriptionInput.click();
        await storyDescriptionInput.sendKeys(description);

        const saveStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.saveStoryButton);
        await saveStoryButton.click();
    }

    static async verifyStoryInBacklog(title) {
        console.log("Verifying story in backlog");
        
        const storyInBacklog = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.backlogStory),
            configuration.browser.timeout
        );
        const storyTitle = await storyInBacklog.getText();
        expect(storyTitle).to.equal(title);
        await storyInBacklog.click();
    }

    static async pressStartButton() {
        console.log("Pressing Start button");
        
        const startStoryButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.startStoryButton),
            configuration.browser.timeout
        );
        await startStoryButton.click();
    }

    static async selectUnestimatedOption() {
        console.log("Selecting Unestimated option");
        
        const dropdownMenu = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.storyPointsDropdown),
            configuration.browser.timeout
        );
        expect(dropdownMenu).to.not.be.undefined;

        const unestimatedOption = await DriverFactory.myDriver.findElement(StoriesPage.unestimatedOption);
        await unestimatedOption.click();
    }

    static async verifyStoryNotMovedToMyWork() {
        console.log("Verifying story not moved to My Work");
        
        const collapseButton = await DriverFactory.myDriver.findElement(StoriesPage.collapseButton);
        if (collapseButton) {
            await collapseButton.click();
        }

        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        expect(counterText).to.equal('0');
    }
}

module.exports = StoryUtils;
