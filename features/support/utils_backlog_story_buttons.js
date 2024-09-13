const DriverFactory = require("../../core/ui/driverFactory");
const StoriesTab = require("../../main/ui/stories_tab");
const StoriesPage = require("../../main/ui/stories_page");
const StoriesPanel = require("../../main/ui/story_panel");
const { until } = require("selenium-webdriver");
const RandomValues = require("./random_values");
const configuration = require("../../configuration.json");

class StoryButtonsUtils {

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

    // Ingresa en una historia creada
    static async enterStory() {
        const storyInBacklog = await DriverFactory.myDriver.findElement(StoriesPage.backlogStory);
        await storyInBacklog.click();
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

    // Esperar hasta que el botón "Collapse" esté visible
    static async pressCollapseButton() {
        const collapseButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.collapseButton),
            configuration.browser.timeout
        );
        await collapseButton.click();
    }

    // Método para colapsar o expandir el dropdown de historias aceptadas
    static async toggleAcceptedStoriesDropdown() {
        const acceptedStoriesDropdown = await DriverFactory.myDriver.findElement(StoriesPage.acceptedStoriesDropdown);
        await acceptedStoriesDropdown.click();
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

    // Método para eliminar una historia de tipo 'feature'
    static async deleteFeatureStory() {
        const deleteStoryButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.deleteStoryButton), configuration.browser.timeout);
        await deleteStoryButton.click();
        
        const confirmDeleteButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.confirmDeleteButton), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsVisible(confirmDeleteButton), configuration.browser.timeout);
        await confirmDeleteButton.click();
    }

    // Método para eliminar una historia de tipo 'bug'
    static async deleteBugStory() {
        const deleteStoryButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.deleteStoryButton), configuration.browser.timeout);
        await deleteStoryButton.click();
        
        const confirmDeleteButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.confirmDeleteButton), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsVisible(confirmDeleteButton), configuration.browser.timeout);
        await confirmDeleteButton.click();
    }

    //Método para habilitar el cuadro de texto de la tarea
    static async enableTaskInputField() {
        const addTaskButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPage.addTaskButton),
            configuration.browser.timeout
        );
        await addTaskButton.click();
    }

    //Método para añadir el texto en el campo de tarea
    static async addTaskText(taskDescription) {
        const randomTaskDescription = RandomValues.getRandomValues(taskDescription);
        const taskInputField = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPanel.addTaskTextField),
            configuration.browser.timeout
        );
        await taskInputField.sendKeys(randomTaskDescription);
    }
    
    //Método para confirmar la adición de la tarea
    static async confirmAddTask() {
        const addTaskSubmitButton = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPanel.confirmAddTaskButton),
            configuration.browser.timeout
        );
        await addTaskSubmitButton.click();
    }    

    // Método para añadir un número aleatorio de tareas a la historia (entre 0 y 5)
    static async addRandomTasksToStory() {
        const randomTaskCount = Math.floor(Math.random() * 6); 
        for (let i = 0; i < randomTaskCount; i++) {
            await this.addTaskText("<TaskDescription,6>");
            await this.confirmAddTask();
        }
    }

    // Método para marcar todas las tareas como completas
    static async markTaskAsComplete() {
        const taskCheckboxes = await DriverFactory.myDriver.findElements(StoriesPage.taskCompleteCheckbox);
        
        for (let checkbox of taskCheckboxes) {
            if (!(await checkbox.isSelected())) {
                await checkbox.click();
            }
        }
    }

   // Método para abrir el dropdown de etiquetas dentro de una historia
    static async openLabelDropdownInStory() {
        const labelDropdown = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPanel.labelDropdownInStory),
            configuration.browser.timeout
        );
        await labelDropdown.click();
    }

    // Método para seleccionar la primera etiqueta disponible dentro del dropdown de etiquetas
    static async selectAnyLabelInStoryDropdown() {
        let labels = await DriverFactory.myDriver.wait(
            until.elementsLocated(StoriesPanel.labelInDropdown),
            configuration.browser.timeout
        );
        if (labels.length > 0) {
            labels = await DriverFactory.myDriver.findElements(StoriesPanel.labelInDropdown);
            await labels[0].click();
        } 
    }

    // Método para verificar que al menos una etiqueta fue asignada correctamente a la historia
    static async verifyLabelAssignedToStory() {
        const assignedLabel = await DriverFactory.myDriver.wait(
            until.elementLocated(StoriesPanel.assignedLabelInStoryPreview), 
            configuration.browser.timeout
        );
         const assignedLabelText = await assignedLabel.getText();
    }
}

module.exports = StoryButtonsUtils;