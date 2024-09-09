const { Given, When, Then } = require('@cucumber/cucumber');
const LabelPanelUtils = require('../support/utils_label_panel');
const StoryButtonsUtils = require('../support/utils_backlog_story_buttons');
const StoryCreationUtils = require('../support/utils_backlog_story_creation');
const ProjectManagementPanel = require('./utils_project_management_panel');

Given('I create a label for assigned', async function () {
    console.log('I create a label for assigned');
    await LabelPanelUtils.openLabelPanel();
    await LabelPanelUtils.clickAddLabelButton();
    await LabelPanelUtils.enterRandomLabelName();
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated();
});

When('I create a user story in the backlog with title {string} and description {string} for assigned label', async function (title, description) {
    console.log(`Creating story with title: "${title}" and description: "${description}"`);
    await ProjectManagementPanel.openBacklogPanelIfNotOpen();
    await StoryCreationUtils.createStory(title, description);
    await StoryButtonsUtils.enterStory();
});

When('I open the labels dropdown in the user story', async function () {
    console.log('I open the labels dropdown in the user story');
    await ProjectManagementPanel.closeAllPanelsExceptBacklog();
    await StoryButtonsUtils.openLabelDropdownInStory();
});

When('I select the created label from the dropdown', async function () {
    console.log('I select the created label from the dropdown');
    await StoryButtonsUtils.selectAnyLabelInStoryDropdown();
    await StoryButtonsUtils.pressCollapseButton();
});

Then('the label should be assigned to the user story', async function () {
    console.log('the label should be assigned to the user story');
    await StoryButtonsUtils.verifyLabelAssignedToStory();
});
