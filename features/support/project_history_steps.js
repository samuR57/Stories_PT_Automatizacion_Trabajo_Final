const { Given, When, Then } = require('@cucumber/cucumber');
const ProjectHistoryPanelUtils = require('../support/utils_project_history');
const ProjectManagementPanel = require('../support/utils_project_management_panel');
const StoryCreationUtils = require('../support/utils_backlog_story_creation');
const LabelPanelUtils = require('../support/utils_label_panel');
const EpicPanelUtils = require('../support/utils_epic_panel');

Given('I have created multiple stories', async function () {
    console.log("I have created multiple stories");
    await ProjectManagementPanel.openRandomBacklogOrIceboxPanel();
    await StoryCreationUtils.createMultipleStories(5); 
});

Given('I have created labels', async function () {
    console.log("I have created labels");
    await LabelPanelUtils.openLabelPanel();
    await LabelPanelUtils.clickAddLabelButton();
    await LabelPanelUtils.enterRandomLabelName(); 
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated();
});

Given('I have created epics', async function () {
    console.log("I have created epics");
    await EpicPanelUtils.openEpicPanel();
    await EpicPanelUtils.clickAddEpicButton();
    await EpicPanelUtils.enterEpicDetails();
    await EpicPanelUtils.saveEpic();
    await EpicPanelUtils.verifyEpicCreated();
});

When('I open the project history panel', async function () {
    console.log("I open the project history panel");
    await ProjectHistoryPanelUtils.openProjectHistoryPanel();
});

Then('I verify that there are change records in the history', async function () {
    console.log("I verify that there are change records in the history");
    await ProjectHistoryPanelUtils.verifyChangeRecordsPresent();
});
