const { By } = require('selenium-webdriver');

class ProjectPanel {
    // Selector para el panel "My Work"
    myWorkPanel = By.css('div[data-panel-id^="my_work_"]');

    // Selector para el panel "Current/Backlog"
    currentBacklogPanel = By.css('li[data-panel-id^="backlog_"]');

    // Selector para el panel "Icebox"
    iceboxPanel = By.css('li[data-panel-id^="icebox_"]');

    // Selector para el panel "Done"
    donePanel = By.css('li[data-panel-id^="done_"]');

    // Selector para el panel "Blocked"
    blockedPanel = By.css('div[data-panel-id^="blockers_"]');

    // Selector para el panel "Epics"
    epicsPanel = By.css('li[data-panel-id^="epics_"]');

    // Selector para el panel "Labels"
    labelsPanel = By.css('li[data-panel-id^="labels_"]');

    // Selector para el panel "Project History"
    projectHistoryPanel = By.css('li[data-panel-id^="project_history_"]');
}

module.exports = new ProjectPanel();