const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const { until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const configuration = require("../../configuration.json");

class StoryPointsUtils {

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
        const iterationDateLink = await DriverFactory.myDriver.findElement(StoriesPage.iterationDateLinkLast);
        const iterationDateText = await iterationDateLink.getText();
        return iterationDateText;
    }

    // Compara las fechas de entrega de las historias cuando se cambia de 0 points a 3 points
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

}

module.exports = StoryPointsUtils;