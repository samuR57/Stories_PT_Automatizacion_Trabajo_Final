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

    // Método para cambiar el estado de una historia a "Unstarted"
    static async openStoryStateDropdown() {
        const stateDropdownButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.storyStateDropdownButton), 
            configuration.browser.timeout
        );
        await stateDropdownButton.click();
    }

    // Método para seleccionar la opción "Unstarted" después de haber presionado el botón start
    static async selectStoryStateUnstartedOption() {
        const unstartedOption = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.unstartedStoryStateOption), 
            configuration.browser.timeout
        );
        await unstartedOption.click();
    }

    // Verifica que la historia aún permanezca en "My Work" después del cambio de estado
    static async verifyStoryRemainsInMyWork() {
        const myWorkCounter = await DriverFactory.myDriver.findElement(StoriesPage.myWorkCounter);
        const counterText = await myWorkCounter.getText();
        const currentCount = parseInt(counterText, 10);
        expect(currentCount).to.be.above(0);
    }

    // Esperar hasta que el botón "Collapse" esté visible
    static async pressCollapseButton() {
        const collapseButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.collapseButton),
            configuration.browser.timeout
        );
        await collapseButton.click();
    }

    // Método para abrir el dropdown de puntos en la historia
    static async openStoryPointsDropdown() {
        const pointsDropdown = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.storyPointsDropdown),
            configuration.browser.timeout
        );
        await pointsDropdown.click();
    }

    // Método para seleccionar 0 puntos en el dropdown de puntos
    static async select0Points() {
        const pointsOption0 = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.pointsOption0),
            configuration.browser.timeout
        );
        await pointsOption0.click();
    }

    // Método para seleccionar 3 puntos en el dropdown de puntos
    static async select3Points() {
        const pointsOption3 = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.pointsOption3),
            configuration.browser.timeout
        );
        await pointsOption3.click();
    }

    // Método para abrir la configuración de "Iteration length in weeks"
    static async openIterationLengthConfig() {
        const iterationLengthLink = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.iterationLengthLink),
            configuration.browser.timeout
        );
        await iterationLengthLink.click();
    }

    // Método para aplicar la longitud de la iteración
    static async applyIterationLength(value) {
        const iterationLengthInput = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.iterationLengthInput),
            configuration.browser.timeout
        );
        await iterationLengthInput.clear();
        await iterationLengthInput.sendKeys(value);
        
        const applyButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.applyIterationLengthButton),
            configuration.browser.timeout
        );
        await applyButton.click();
    }

    // Método para abrir la configuración de velocidad (Velocity)
    static async openVelocityConfig() {
        const velocityButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.velocityButton),
            configuration.browser.timeout
        );
        await velocityButton.click();
    }

    // Método para aplicar la velocidad
    static async applyVelocity(value) {
        const velocityInput = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.velocityInput),
            configuration.browser.timeout
        );
        await velocityInput.clear();
        await velocityInput.sendKeys(value);
        const applyVelocityButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.applyVelocityButton),
            configuration.browser.timeout
        );
        await applyVelocityButton.click();
    }

    // Método para guardar la fecha de la iteración antes de hacer cambios
    static async saveIterationDate() {
        const iterationDateElement = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.iterationDateLink),
            configuration.browser.timeout
        );
        const iterationDateText = await iterationDateElement.getText();
        this.savedIterationDate = iterationDateText;
    }

    // Verifica la última fecha de entrega en la historia
    static async saveIterationDateLast() {
        console.log("Verificando la última fecha de entrega después de asignar puntos...");
        const iterationDateLink = await DriverFactory.myDriver.findElement(StoriesPage.iterationDateLinkLast);
        const iterationDateText = await iterationDateLink.getText();
        return iterationDateText;
    }

    //Compara las fechas de entrega de las historias cuando se cambia de 0 points a 3 points
    static async compareIterationDates() {
        const savedDate = this.savedIterationDate;
        if (!savedDate) {
            throw new Error("No se ha guardado ninguna fecha previamente. Verifica que se haya ejecutado el método saveIterationDate.");
        }
        const newIterationDate = await this.saveIterationDateLast();
        if (savedDate === newIterationDate) {
            throw new Error("Las fechas son iguales, pero deberían ser diferentes.");
        }
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

    // Método para colapsar o expandir el dropdown de historias aceptadas
    static async toggleAcceptedStoriesDropdown() {
        const acceptedStoriesDropdown = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoriesDropdown);
        await acceptedStoriesDropdown.click();
    }

    // Verifica que una historia aceptada no se puede mover
    static async verifyStoryCannotBeMoved() {
        const acceptedStory = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoryTitle);
        const backlogStory = await DriverFactory.myDriver.findElement(StoriesPage.backlogStory);
        const actions = DriverFactory.myDriver.actions({bridge: true});
        try {
            await actions.dragAndDrop(acceptedStory, backlogStory).perform();
            throw new Error("La historia aceptada se movió, pero no debería ser posible.");
        } catch (error) {
        }
    }

    // Verifica si el panel Current Iteration/Backlog está activo
    static async verifyCurrentBacklogTabActive() {
        const currentBacklogTabActive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabActive);
        if (currentBacklogTabActive.length === 0) {
            throw new Error("El panel Current/Backlog no está activo.");
        }
    }

    // Activa el panel Current Iteration/Backlog si no está activo
    static async activateCurrentBacklogTab() {
        const currentBacklogTabInactive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabInactive);
        if (currentBacklogTabInactive.length > 0) {
            await currentBacklogTabInactive[0].click();
        }
    }

    // Presiona el botón de opciones (tres puntos) en el panel Current Iteration/Backlog
    static async openCurrentBacklogOptions() {
        const optionsButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.optionsButton), 10000);
        await optionsButton.click();
    }

    // Selecciona la opción de dividir Current Iteration y Backlog
    static async splitCurrentAndBacklog() {
        await this.openCurrentBacklogOptions();
        const splitOption = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.splitOption), 10000);
        await splitOption.click();
    }

    // Verifica que los paneles Current Iteration y Backlog se han separado
    static async verifyPanelsSeparated() {
        const currentIterationPanel = await DriverFactory.myDriver.findElements(StoriesPage.currentIterationPanel);
        const backlogPanel = await DriverFactory.myDriver.findElements(StoriesPage.backlogPanel);
        if (currentIterationPanel.length === 0 || backlogPanel.length === 0) {
            throw new Error("Los paneles Current Iteration y Backlog no se han separado.");
        }
    }

    // Presiona el botón de opciones (tres puntos) en el panel de Backlog
    static async openBacklogOptions() {
        const optionsButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.optionsButton), 10000);
        await optionsButton.click();
    }

    // Selecciona la opción de combinar Current Iteration y Backlog
    static async combineCurrentAndBacklog() {
        await this.openBacklogOptions();
        const combineOption = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.combineOption), 10000);
        await combineOption.click();
    }

    /// Verifica que los paneles Current Iteration y Backlog se han combinado
    static async verifyPanelsCombined() {
        const currentBacklogTabActive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabActive);
        if (currentBacklogTabActive.length === 0) {
            throw new Error("Los paneles Current Iteration y Backlog no se han combinado correctamente.");
        } else {
        }
    }

}

module.exports = StoryUtils;
