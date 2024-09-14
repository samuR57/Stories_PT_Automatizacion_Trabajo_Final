const DriverFactory = require('../../core/ui/driverFactory');
const { until } = require('selenium-webdriver');
const configuration = require('../../configuration.json');
const ProjectHistoryPanel = require('../../main/ui/project_history_panel');
const ProjectPanel = require('../../main/ui/project_panel');

class ProjectHistoryPanelUtils {
    
    // Método para abrir el panel de "Project History"
    static async openProjectHistoryPanel() {
        const projectHistoryPanel = await DriverFactory.myDriver.wait(
            until.elementLocated(ProjectPanel.projectHistoryPanel),
            configuration.browser.timeout
        );
        await projectHistoryPanel.click();
    }

    // Método para verificar que existen registros de cambios en el historial
    static async verifyChangeRecordsPresent() {
        await DriverFactory.myDriver.wait(
            until.elementsLocated(ProjectHistoryPanel.changeRecordEntries),
            configuration.browser.timeout
        );
    }
}

module.exports = ProjectHistoryPanelUtils;
