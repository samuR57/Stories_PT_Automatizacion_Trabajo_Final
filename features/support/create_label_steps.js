const { Given, When, Then } = require('@cucumber/cucumber');
const LabelPanelUtils = require('../support/utils_label_panel');
const ProjectManagementPanel = require('../support/utils_project_management_panel');

Given('the label panel is open', async function () {
    console.log('the label panel is open');
    await LabelPanelUtils.openLabelPanel();
});

When('I click the Add Label button', async function () {
    console.log('I click the Add Label button');
    await LabelPanelUtils.clickAddLabelButton(); 
});

When('I enter a random name for the label', async function () {
    console.log('I enter a random name for the label');
    await LabelPanelUtils.enterRandomLabelName();
});

When('I confirm the creation of the label', async function () {
    console.log('I confirm the creation of the label');
    await LabelPanelUtils.clickConfirmAddLabelButton(); 
});

Then('the label should be created and visible in the label panel', async function () {
    console.log('the label should be created and visible in the label panel');
    await LabelPanelUtils.verifyLabelCreated();
});
