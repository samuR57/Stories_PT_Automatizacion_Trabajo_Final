const DriverFactory = require('../../core/ui/driverFactory');
const { until } = require('selenium-webdriver');
const configuration = require('../../configuration.json');
const ProjectPanel = require('../../main/ui/project_panel');
const EpicsPanel = require('../../main/ui/epics_panel');
const RandomValues = require('../support/random_values');
const ProjectManagementPanel = require("./utils_project_management_panel");
const LabelPanelUtils = require('../support/utils_label_panel')

class EpicPanelUtils {

    // Método para cerrar todos los paneles y abrir solo el panel de Epics
    static async openEpicPanel() {
        await ProjectManagementPanel.openOnlyOnePanel(ProjectPanel.epicsPanel);
        const epicsPanel = await DriverFactory.myDriver.wait(
            until.elementLocated(ProjectPanel.epicsPanel),
            10000
        );
        const isVisible = await epicsPanel.getAttribute("data-panel-visible");
        if (isVisible === "false") {
            await epicsPanel.click();
        }
    }

    // Método para presionar el botón de "Add Epic"
    static async clickAddEpicButton() {
        const addEpicButton = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.addEpicButton),
            configuration.browser.timeout
        );
        await addEpicButton.click();
    }

    // Método para ingresar solo el título del Epic
    static async enterEpicDetails() {
        this.epicTitle = RandomValues.getRandomValues('<EpicTitle, 5>');
        const titleInput = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.epicTitleInput),
            configuration.browser.timeout
        );
        await titleInput.sendKeys(this.epicTitle);
    }

    // Método para guardar el Epic creado
    static async saveEpic() {
        const saveButton = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.saveEpicButton),
            configuration.browser.timeout
        );
        await saveButton.click();
    }

    // Método para verificar que el Epic se haya creado correctamente
    static async verifyEpicCreated() {
        const epicTitleElement = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.epicTitleInList),
            configuration.browser.timeout
        );
        const createdTitle = await epicTitleElement.getText();
        if (createdTitle !== this.epicTitle) {
            throw new Error('The Epic was not created correctly.');
        }
    }

    // Método para abrir el Epic recién creado
    static async openCreatedEpic() {
        const epicTitleElement = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.epicTitleInList),
            configuration.browser.timeout
        );
        await epicTitleElement.click(); 
    }

    // Método para presionar el botón de eliminar Epic
    static async clickDeleteEpicButton() {
        const deleteButton = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.deleteEpicButton),
            configuration.browser.timeout
        );
        await deleteButton.click();
    }

    // Método para confirmar la eliminación del Epic
    static async confirmEpicDeletion() {
        const confirmDeleteButton = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.confirmDeleteButton),
            configuration.browser.timeout
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
        await confirmDeleteButton.click();
    }

    // Método para abrir el dropdown de etiquetas en el Epic
    static async openLabelDropdownInEpic() {
        const labelDropdown = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.labelDropdownInEpic),
            configuration.browser.timeout
        );
        await labelDropdown.click();
    }

    // Método para seleccionar una etiqueta del dropdown
    static async selectLabelFromDropdown(labelName) {
        const labelElements = await DriverFactory.myDriver.wait(
            until.elementsLocated(EpicsPanel.labelInDropdown),
            configuration.browser.timeout
        );

        for (let labelElement of labelElements) {
            const labelText = await labelElement.getText();
            if (labelText.toLowerCase() === labelName.toLowerCase()) {
                await labelElement.click();
                return;
            }
        }
    }

    // Método para verificar que la etiqueta ha sido asignada al Epic
    static async verifyLabelAssignedToEpic() {
        await LabelPanelUtils.openLabelPanel();
        const assignedLabelElement = await DriverFactory.myDriver.wait(
            until.elementLocated(EpicsPanel.assignedLabelInEpic),
            configuration.browser.timeout
        );   
        const assignedLabelText = await assignedLabelElement.getText();
        console.log(`Etiqueta asignada: ${assignedLabelText}`);
    }

}

module.exports = EpicPanelUtils;
