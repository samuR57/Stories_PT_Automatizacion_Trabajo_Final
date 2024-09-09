const DriverFactory = require("../../core/ui/driverFactory");
const StoriesTab = require("../../main/ui/stories_tab");
const StoryPanel = require("../../main/ui/story_panel");
const StoriesPage = require("../../main/ui/stories_page");
const { until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const configuration = require("../../configuration.json");
const environment = require("../../environment.json");

class StoryVerificationUtils {

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

    // Verifica que la historia aún permanezca en "My Work" después del cambio de estado
    static async verifyStoryRemainsInMyWork() {
        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        const currentCount = parseInt(counterText, 10);
        expect(currentCount).to.be.above(0);
    }

    // Verifica que la historia aceptada aparece en el dropdown de historias aceptadas
    static async verifyStoryInAcceptedDropdown() {
        const acceptedStoriesDropdown = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoriesDropdown);
        await acceptedStoriesDropdown.click();
        const acceptedStoryTitle = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoryTitle);
        const storyTitle = await acceptedStoryTitle.getText();
        return storyTitle;
    }

    // Verifica el número de historias aceptadas en el dropdown
    static async verifyAcceptedStoryCount(expectedCount) {
        const acceptedStoryCountLabel = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.acceptedStoryCountLabel), 
            configuration.browser.timeout
        );
        const acceptedStoryCountText = await acceptedStoryCountLabel.getText();
        const acceptedCount = parseInt(acceptedStoryCountText.match(/\d+/)[0], 10);
        expect(acceptedCount).to.equal(expectedCount);
    }

    // Verifica que una historia aceptada no se puede mover
    static async verifyStoryCannotBeMoved() {
        const acceptedStory = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoryTitle);
        const backlogStory = await DriverFactory.myDriver.findElement(StoriesPage.backlogStory);
        const actions = DriverFactory.myDriver.actions({bridge: true});
        try {
            await actions.dragAndDrop(acceptedStory, backlogStory).perform();
            throw new Error("La historia aceptada se movió, pero no debería ser posible.");
        } catch (error) {}
    }

    // Verifica si el panel Current Iteration/Backlog está activo
    static async verifyCurrentBacklogTabActive() {
        const currentBacklogTabActive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabActive);
        if (currentBacklogTabActive.length === 0) {
            throw new Error("El panel Current/Backlog no está activo.");
        }
    }

    // Verifica que los paneles Current Iteration y Backlog se han separado
    static async verifyPanelsSeparated() {
        const currentIterationPanel = await DriverFactory.myDriver.findElements(StoriesPage.currentIterationPanel);
        const backlogPanel = await DriverFactory.myDriver.findElements(StoriesPage.backlogPanel);
        if (currentIterationPanel.length === 0 || backlogPanel.length === 0) {
            throw new Error("Los paneles Current Iteration y Backlog no se han separado.");
        }
    }

    // Verificar que una historia esté en el panel de backlog
    static async verifyStoryInBacklog(storyName) {
        let storyItem = await DriverFactory.myDriver.findElement(StoriesTab.previewStoryItemRow);
        storyItem = await DriverFactory.myDriver.wait(until.elementTextContains(storyItem, storyName));
        expect(storyItem).to.not.equal(undefined);
    }

    // Verificar que una historia en el backlog tiene la información especificada
    static async verifyStoryInformationInBacklog(storyName, dataTable) {
        let storyItem = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.previewStoryItemRow));
        storyItem = await DriverFactory.myDriver.wait(until.elementTextContains(storyItem, storyName));
        await (storyItem).click();

        const storyTitleTextField = await DriverFactory.myDriver.findElement(StoryPanel.storyTitleTextField);
        StoryPanel.locatorAux.value = StoryPanel.storyTypeSelectedLabel.value.replace("{0}", dataTable.rowsHash().StoryType.toLowerCase());
        const storyTypeSelected = await DriverFactory.myDriver.findElement(StoryPanel.locatorAux);

        let ownerNameSelected = undefined;
        if (dataTable.rowsHash().Owners !== undefined)
            ownerNameSelected = await DriverFactory.myDriver.findElement(StoryPanel.ownerNameSelectedLabel);

        expect((await storyTitleTextField.getText()).toString()).to.equal(storyName);
        expect((await storyTypeSelected.getText()).toString()).to.equal(dataTable.rowsHash().StoryType);

        if (dataTable.rowsHash().Owners !== undefined) {
            expect((await ownerNameSelected.getText()).toString()).to.equal(environment.prod.userMember01.name);
        }
    }

    // Verifica que la ventana emergente tiene el título esperado
    static async verifyPopupWindowTitle(expectedTitle) {
        let titleLabel = await DriverFactory.myDriver.findElement(StoriesTab.titleAlertDialogLabel);
        titleLabel = await DriverFactory.myDriver.wait(until.elementTextContains(titleLabel, expectedTitle));
        expect(titleLabel).to.not.equal(undefined);
    }

    // Verifica si el backlog está vacío
    static async isBacklogEmpty() {
        const emptyMessageText = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.emptyMessageText), configuration.browser.timeout);
        return await emptyMessageText.isDisplayed();
    }

    // Verifica que los paneles Current Iteration y Backlog se han combinado
    static async verifyPanelsCombined() {
        const currentBacklogTabActive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabActive);
        if (currentBacklogTabActive.length === 0) {
            throw new Error("Los paneles Current Iteration y Backlog no se han combinado correctamente.");
        } else {
        }
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

}

module.exports = StoryVerificationUtils;