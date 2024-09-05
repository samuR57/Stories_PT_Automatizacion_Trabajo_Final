const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const { until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const configuration = require("../../configuration.json");

class StoryUtils {

    // Crea una nueva historia en el backlog con el título y la descripción proporcionados
    static async createStory(title, description) {
        const backlogTabInactive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabInactive);
        if (backlogTabInactive.length > 0) {
            await backlogTabInactive[0].click();
        }

        const addStoryButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addStoryButton), 10000);
        await addStoryButton.click();

        const storyTitleInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyTitleInput), 10000);
        await storyTitleInput.sendKeys(title);

        const storyDescriptionInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyDescriptionInput), 10000);
        await storyDescriptionInput.click();
        await storyDescriptionInput.sendKeys(description);

        const saveStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.saveStoryButton);
        await saveStoryButton.click();
    }

    // Verifica que la historia aparezca en el backlog
    static async verifyStoryInBacklog(title) {
        const storyInBacklog = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.backlogStory),
            configuration.browser.timeout
        );
        const storyTitle = await storyInBacklog.getText();
        expect(storyTitle).to.equal(title);
        await storyInBacklog.click();
    }

    // Presiona el botón "Start" de la historia
    static async pressStartButton() {
        const startStoryButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.startStoryButton),
            configuration.browser.timeout
        );
        await startStoryButton.click();
    }

    // Selecciona una opción de puntos aleatoria para la historia
    static async selectRandomPoints() {
        const dropdownMenu = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.storyPointsDropdown),
            configuration.browser.timeout
        );
        expect(dropdownMenu).to.not.be.undefined;

        const randomPointOptions = [StoriesPage.pointsOption0, StoriesPage.pointsOption1, StoriesPage.pointsOption2, StoriesPage.pointsOption3];
        const randomIndex = Math.floor(Math.random() * randomPointOptions.length);
        const selectedPointOption = randomPointOptions[randomIndex];

        const pointOption = await DriverFactory.myDriver.findElement(selectedPointOption);
        await pointOption.click();
    }

    // Selecciona la opción "Unestimated" para la historia
    static async selectUnestimatedOption() {
        const dropdownMenu = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.storyPointsDropdown),
            configuration.browser.timeout
        );
        expect(dropdownMenu).to.not.be.undefined;

        const unestimatedOption = await DriverFactory.myDriver.findElement(StoriesPage.unestimatedOption);
        await unestimatedOption.click();
    }

    // Verifica si el botón "Finish" aparece después de presionar Start
    static async verifyFinishButton() {
        const finishButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.finishButton));
        await DriverFactory.myDriver.wait(until.elementIsVisible(finishButton), configuration.browser.timeout);
    }

    // Verifica que la historia no se haya movido a "My Work"
    static async verifyStoryNotMovedToMyWork() {
        const collapseButton = await DriverFactory.myDriver.findElement(StoriesPage.collapseButton);
        if (collapseButton) {
            await collapseButton.click();
        }

        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        expect(counterText).to.equal('0');
    }

    // Verifica que la historia se haya movido a "My Work" aumentando el contador en 1
    static async verifyStoryMovedToMyWork() {
        const collapseButton = await DriverFactory.myDriver.findElement(StoriesPage.collapseButton);
        if (collapseButton) {
            await collapseButton.click();
        }

        await DriverFactory.myDriver.sleep(2000);

        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        const currentCount = parseInt(counterText, 10);
        expect(currentCount).to.equal(1);
    }
}

module.exports = StoryUtils;
