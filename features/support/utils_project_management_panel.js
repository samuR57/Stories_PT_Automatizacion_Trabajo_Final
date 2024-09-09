const DriverFactory = require('../../core/ui/driverFactory');
const ProjectPanel = require('../../main/ui/project_panel');
const { until } = require('selenium-webdriver');

class ProjectManagementPanel {

    // Método para verificar si el panel "My Work" está abierto
    static async isMyWorkPanelOpen() {
        try {
            const myWorkPanel = await DriverFactory.myDriver.findElement(ProjectPanel.myWorkPanel);
            const isVisible = await myWorkPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Current/Backlog" está abierto
    static async isCurrentBacklogPanelOpen() {
        try {
            const currentBacklogPanel = await DriverFactory.myDriver.findElement(ProjectPanel.currentBacklogPanel);
            const isVisible = await currentBacklogPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Icebox" está abierto
    static async isIceboxPanelOpen() {
        try {
            const iceboxPanel = await DriverFactory.myDriver.findElement(ProjectPanel.iceboxPanel);
            const isVisible = await iceboxPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Done" está abierto
    static async isDonePanelOpen() {
        try {
            const donePanel = await DriverFactory.myDriver.findElement(ProjectPanel.donePanel);
            const isVisible = await donePanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Blocked" está abierto
    static async isBlockedPanelOpen() {
        try {
            const blockedPanel = await DriverFactory.myDriver.findElement(ProjectPanel.blockedPanel);
            const isVisible = await blockedPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Epics" está abierto
    static async isEpicsPanelOpen() {
        try {
            const epicsPanel = await DriverFactory.myDriver.findElement(ProjectPanel.epicsPanel);
            const isVisible = await epicsPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Labels" está abierto
    static async isLabelsPanelOpen() {
        try {
            const labelsPanel = await DriverFactory.myDriver.findElement(ProjectPanel.labelsPanel);
            const isVisible = await labelsPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para verificar si el panel "Project History" está abierto
    static async isProjectHistoryPanelOpen() {
        try {
            const projectHistoryPanel = await DriverFactory.myDriver.findElement(ProjectPanel.projectHistoryPanel);
            const isVisible = await projectHistoryPanel.getAttribute('data-panel-visible');
            return isVisible === "true";
        } catch (error) {
            return false;
        }
    }

    // Método para cerrar un panel si está abierto
    static async closePanel(panelSelector) {
        try {
            const panel = await DriverFactory.myDriver.wait(until.elementLocated(panelSelector), 10000);
            const isVisible = await panel.getAttribute('data-panel-visible');           
            if (isVisible === "true") {
                await panel.click();
            }
        } catch (error) {
        }
    }

    // Método para asegurarse de que solo un panel esté abierto
        static async openOnlyOnePanel(panelToOpenSelector) {
        const panelsToClose = [
            ProjectPanel.myWorkPanel,
            ProjectPanel.currentBacklogPanel,
            ProjectPanel.iceboxPanel,
            ProjectPanel.donePanel,
            ProjectPanel.blockedPanel,
            ProjectPanel.epicsPanel,
            ProjectPanel.labelsPanel,
            ProjectPanel.projectHistoryPanel
        ];
        for (const panel of panelsToClose) {
            await this.closePanel(panel);
        }
        try {
            console.log("Intentando abrir el panel seleccionado...");
            const panelToOpen = await DriverFactory.myDriver.wait(until.elementLocated(panelToOpenSelector), 10000);
            const isVisible = await panelToOpen.getAttribute('data-panel-visible');
            if (isVisible === "false") {
                await panelToOpen.click(); 
            }
        } catch (error) {
        }
    }

    // Método para cerrar todos los paneles abiertos y abrir aleatoriamente entre "Current/Backlog" o "Icebox"
    static async openRandomBacklogOrIceboxPanel() {
        const panels = [ProjectPanel.currentBacklogPanel, ProjectPanel.iceboxPanel];
        const randomIndex = Math.floor(Math.random() * panels.length);
        const randomPanel = panels[randomIndex];
        await this.openOnlyOnePanel(randomPanel);
    }

    // Método para abrir el panel "Current/Backlog" solo si no está ya abierto
    static async openBacklogPanelIfNotOpen() {
        const isBacklogOpen = await this.isCurrentBacklogPanelOpen();   
        if (!isBacklogOpen) {
            await this.openOnlyOnePanel(ProjectPanel.currentBacklogPanel);
        }
    }

    // Método para cerrar todos los paneles excepto el "Current/Backlog"
    static async closeAllPanelsExceptBacklog() {
        const panelsToClose = [
            ProjectPanel.myWorkPanel,
            ProjectPanel.iceboxPanel,
            ProjectPanel.donePanel,
            ProjectPanel.blockedPanel,
            ProjectPanel.epicsPanel,
            ProjectPanel.labelsPanel,
            ProjectPanel.projectHistoryPanel
        ];
        for (const panel of panelsToClose) {
            await this.closePanel(panel);
        }
        const isBacklogOpen = await this.isCurrentBacklogPanelOpen();       
        if (!isBacklogOpen) {
            await this.openOnlyOnePanel(ProjectPanel.currentBacklogPanel);
        }
    }

}

module.exports = ProjectManagementPanel;
