const DriverFactory = require("../../core/ui/driverFactory");
const LabelsPanel = require("../../main/ui/labels_panel");
const RandomValues = require("./random_values");
const ProjectManagementPanel = require("./utils_project_management_panel");
const ProjectPanel = require("../../main/ui/project_panel");
const { expect } = require("chai");
const { until } = require("selenium-webdriver");
const configuration = require("../../configuration.json");

class LabelPanelUtils {

    constructor() {
        this.generatedLabelName = null;
    }

    // Método para cerrar todos los paneles y abrir solo el panel de etiquetas
    static async openLabelPanel() {
        await ProjectManagementPanel.openOnlyOnePanel(ProjectPanel.labelsPanel);
        const labelsPanel = await DriverFactory.myDriver.wait(
            until.elementLocated(ProjectPanel.labelsPanel),
            10000
        );
        const isVisible = await labelsPanel.getAttribute("data-panel-visible");
        if (isVisible === "false") {
            await labelsPanel.click();
        }
    }

    // Método para clickear el botón "Add Label"
    static async clickAddLabelButton() {
        const addLabelButton = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.addLabelButton), 
            configuration.browser.timeout
        );
        await addLabelButton.click();
    }

    // Método para ingresar el nombre de la etiqueta con caracteres aleatorios y guardarlo
    static async enterRandomLabelName() {
        const labelInput = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.labelNameInput), 
            configuration.browser.timeout
        );
        const randomLabelName = RandomValues.getRandomValues('<LabelName, 8>');
        await labelInput.sendKeys(randomLabelName);
        this.generatedLabelName = randomLabelName; 
    }

    // Método para clickear el botón "Add" que confirma la creación de la etiqueta
    static async clickConfirmAddLabelButton() {
        const confirmAddButton = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.confirmAddButton), 
            configuration.browser.timeout
        );
        await confirmAddButton.click();
    }

    // Método para verificar que la etiqueta fue creada en el panel de etiquetas
    static async verifyLabelCreated() {
        const createdLabel = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.labelName), 
            configuration.browser.timeout
        );
        const labelText = await createdLabel.getText();
        expect(labelText.toLowerCase()).to.equal(this.generatedLabelName.toLowerCase()); 
    }

     // Método para abrir el dropdown de la etiqueta creada
    static async openLabelDropdown() {
        const createdLabel = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.labelName),
            configuration.browser.timeout
        );
        const actions = DriverFactory.myDriver.actions({ bridge: true });
        await actions.move({ origin: createdLabel }).perform();
        const dropdownButton = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.labelDropdown),
            configuration.browser.timeout
        );
        await dropdownButton.click();
    }

    // Método para seleccionar la opción "Delete" en el dropdown
    static async selectDeleteOption() {
        const deleteOption = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.deleteLabelOption),
            configuration.browser.timeout
        );
        await deleteOption.click();
    }

    // Método para confirmar la eliminación de la etiqueta en el cuadro de diálogo de confirmación
    static async confirmDeleteLabel() {
        const confirmDeleteButton = await DriverFactory.myDriver.wait(
            until.elementLocated(LabelsPanel.confirmDeleteButton),
            configuration.browser.timeout
        );
        await confirmDeleteButton.click();
    }

    // Método para verificar que la etiqueta fue eliminada
    static async verifyLabelDeleted() {
        const labelElements = await DriverFactory.myDriver.findElements(LabelsPanel.labelName);
        let labelFound = false;
        for (let labelElement of labelElements) {
            const labelText = await labelElement.getText();
            if (labelText.toLowerCase() === this.generatedLabelName.toLowerCase()) {
                labelFound = true;
                break;
            }
        }
        expect(labelFound).to.be.false;
    }

}

module.exports = LabelPanelUtils;
