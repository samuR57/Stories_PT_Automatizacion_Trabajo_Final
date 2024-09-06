const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const { until, Key } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const configuration = require("../../configuration.json");
const RandomValues = require("./random_values");

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

    // Crea múltiples historias en el backlog y luego refresca la página
    static async createMultipleStories(numberOfStories) {
        for (let i = 0; i < numberOfStories; i++) {
            const randomTitle = RandomValues.getRandomValues(`<StoryTitle, 6>`);
            await this.createStory(randomTitle, "");
        }

        await DriverFactory.myDriver.navigate().refresh();
        await DriverFactory.myDriver.sleep(5000);
    }

    // Mueve cualquier historia dentro del backlog
    static async moveStoryInBacklog() {
        const storiesInBacklog = await DriverFactory.myDriver.wait(
            until.elementsLocated(StoriesPage.storyToMove),
            configuration.browser.timeout
        );

        if (storiesInBacklog.length === 0) {
            throw new Error("No stories found in the backlog");
        }

        const storyToMove = storiesInBacklog[0];
        const lastStory = storiesInBacklog[storiesInBacklog.length - 1];

        await DriverFactory.myDriver.executeScript("arguments[0].scrollIntoView(true);", storyToMove);
        await DriverFactory.myDriver.executeScript("arguments[0].scrollIntoView(true);", lastStory);

        await DriverFactory.myDriver.wait(until.elementIsVisible(storyToMove), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsVisible(lastStory), configuration.browser.timeout);

        const actions = DriverFactory.myDriver.actions({bridge: true});
        await actions.dragAndDrop(storyToMove, lastStory).perform();
    }

    // Verifica que la historia se haya movido a la nueva posición
    static async verifyStoryMovedInBacklog() {
        const stories = await DriverFactory.myDriver.findElements(StoriesPage.backlogStory);
        const firstStoryTitle = await stories[0].getText();
        return firstStoryTitle;
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

    // Presiona el botón "Finish" de la historia
    static async pressFinishButton() {
        const finishButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.finishButton),
            configuration.browser.timeout
        );
        await finishButton.click();
    }

    // Presiona el botón "Deliver" de la historia
    static async pressDeliverButton() {
        const deliverButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.deliverButton),
            configuration.browser.timeout
        );
        await deliverButton.click();
    }

    // Presiona el botón "Accept" de la historia
    static async pressAcceptButton() {
        const acceptButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.acceptButton),
            configuration.browser.timeout
        );
        await acceptButton.click();
    }

    // Añadir un bloqueador a la historia
    static async addBlocker() {
        const addBlockerButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addBlockerButton), 10000);
        await addBlockerButton.click();

        const blockerInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.blockerInputField), 10000);
        const randomBlockerText = RandomValues.getRandomValues('<BlockerReason,6>');
        await blockerInput.sendKeys(randomBlockerText);

        const addBlockerConfirmButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addBlockerConfirmButton), 10000);
        await addBlockerConfirmButton.click();

        const cancelBlockerButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.cancelBlockerButton), 10000);
        await cancelBlockerButton.click();
    }

    // Verifica si el cuadro de advertencia aparece al intentar aceptar la historia bloqueada
    static async verifyWarningPopupAndCancel() {
        const warningPopup = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.warningPopup), 10000);
        const warningText = await warningPopup.getText();
        expect(warningText).to.contain("Accept With Unresolved Items?");

        // Presiona el botón "Cancel" en el cuadro de advertencia
        const cancelButtonInWarning = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.cancelButtonInWarning), 10000);
        await cancelButtonInWarning.click();
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

        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        const currentCount = parseInt(counterText, 10);
        expect(currentCount).to.equal(1);
    }
    // Ingresa en una historia creada
    static async enterStory() {
        const storyInBacklog = await DriverFactory.myDriver.findElement(StoriesPage.backlogStory);
        await storyInBacklog.click();
    }

    // Método que intenta mover la historia "Started" debajo de las "Unstarted"
    static async moveStartedStoryBelowUnstarted() {
        const storiesInBacklog = await DriverFactory.myDriver.findElements(StoriesPage.backlogStory);
        const startedStory = storiesInBacklog[0];
        const unstartedStory = storiesInBacklog[1];
        const actions = DriverFactory.myDriver.actions({ bridge: true });
        await actions.dragAndDrop(startedStory, unstartedStory).perform();
    }
}

module.exports = StoryUtils;
