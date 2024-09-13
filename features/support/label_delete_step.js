const { Given, When, Then } = require('@cucumber/cucumber');
const LabelPanelUtils = require('./utils_label_panel');

Given('the label panel is open for delete', async function () {
    console.log('the label panel is open for delete');
    await LabelPanelUtils.openLabelPanel();
});

When('I creation label', async function () {
    console.log('I creation label');
    await LabelPanelUtils.clickAddLabelButton(); 
    await LabelPanelUtils.enterRandomLabelName();
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated(); 
});

When('I delete label', async function () {
    console.log('I delete label');
    await LabelPanelUtils.openLabelDropdown();
    await LabelPanelUtils.selectDeleteOption();
    await LabelPanelUtils.confirmDeleteLabel();
});

Then('the label should no longer be visible in the label panel', async function () {
    console.log('the label should no longer be visible in the label panel');
    await LabelPanelUtils.verifyLabelDeleted();
});
