const { Given, When, Then } = require('@cucumber/cucumber');
const LabelPanelUtils = require('../support/utils_label_panel');
const ProjectManagementPanel = require('../support/utils_project_management_panel');

Given('the label panel is open for delete', async function () {
    console.log('Opening the label panel');
    await LabelPanelUtils.openLabelPanel();
});

When('I creation label', async function () {
    console.log('Clicking the Add Label button');
    await LabelPanelUtils.clickAddLabelButton(); 
    await LabelPanelUtils.enterRandomLabelName();
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated(); 
});

When('I delete label', async function () {
    console.log('Opening the dropdown for the created label');
    await LabelPanelUtils.openLabelDropdown();
    await LabelPanelUtils.selectDeleteOption();
    await LabelPanelUtils.confirmDeleteLabel();
});

Then('the label should no longer be visible in the label panel', async function () {
    console.log('Verifying the label was deleted');
    await LabelPanelUtils.verifyLabelDeleted();
});
