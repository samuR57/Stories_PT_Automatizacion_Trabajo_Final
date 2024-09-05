const { When, Then } = require("@cucumber/cucumber");
const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const chai = require("chai");
const expect = chai.expect;
const { until } = require("selenium-webdriver");
const configuration = require("../../configuration.json");

let createdStoryTitle; // Variable global para almacenar el título de la historia

When('I create a new story with title {string} and description {string} without assigning points', async function (title, description) {
    console.log(`When: I create a new story with title "${title}" and description "${description}" without assigning points`);
    
    const backlogTabInactive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabInactive);
    if (backlogTabInactive.length > 0) {
        await backlogTabInactive[0].click();
    }

    await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addStoryButton), 10000);
    const addStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.addStoryButton);
    await addStoryButton.click();

    const storyTitleInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyTitleInput), 10000);
    await storyTitleInput.sendKeys(title);
    createdStoryTitle = title;

    const storyDescriptionInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyDescriptionInput), 10000);
    await storyDescriptionInput.click();
    await storyDescriptionInput.sendKeys(description);

    const saveStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.saveStoryButton);
    await saveStoryButton.click();
});

Then('the story should appear in the backlog', async function () {
    console.log("Then: the story should appear in the backlog");
    
    const storyInBacklog = await DriverFactory.myDriver.wait(
        until.elementLocated(StoriesPage.backlogStory),
        configuration.browser.timeout
    );
    const storyTitle = await storyInBacklog.getText();
    expect(storyTitle).to.equal(createdStoryTitle);
    await storyInBacklog.click();
});

Then('I should not be able to press the "Start" button for the story', async function () {
    console.log('Then: I should not be able to press the "Start" button for the story');
    
    const startStoryButton = await DriverFactory.myDriver.wait(
        until.elementLocated(StoriesPage.startStoryButton),
        configuration.browser.timeout
    );
    await startStoryButton.click();

    const dropdownMenu = await DriverFactory.myDriver.wait(
        until.elementLocated(StoriesPage.storyPointsDropdown),
        configuration.browser.timeout
    );
    expect(dropdownMenu).to.not.be.undefined;

    const unestimatedOption = await DriverFactory.myDriver.findElement(StoriesPage.unestimatedOption);
    await unestimatedOption.click();
});

Then('the story should not move to "My Work"', async function () {
    console.log('Then: the story should not move to "My Work"');
    
    const collapseButton = await DriverFactory.myDriver.findElement(StoriesPage.collapseButton);
    if (collapseButton) {
        await collapseButton.click();
    }

    const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
    const counterText = await myWorkCounter.getText();
    expect(counterText).to.equal('0');
});
