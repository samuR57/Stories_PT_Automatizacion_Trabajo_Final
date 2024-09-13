const { Given, When, Then } = require('@cucumber/cucumber');
const LabelPanelUtils = require('./utils_label_panel');

Given('the label panel is open for renaming', async function () {
    console.log('the label panel is open for renaming');
    await LabelPanelUtils.openLabelPanel();
});

When('I create a label to rename', async function () {
    console.log('I create a label to rename');
    await LabelPanelUtils.clickAddLabelButton();
    await LabelPanelUtils.enterRandomLabelName();
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated();
});

When('I rename label', async function () {
    console.log('I rename label');
    await LabelPanelUtils.openLabelDropdown();
    await LabelPanelUtils.selectRenameOption();
    await LabelPanelUtils.enterNewRandomLabelName();
    await LabelPanelUtils.clickApplyRenameButton();
});

Then('the label should be renamed and visible in the label panel', async function () {
    console.log('the label should be renamed and visible in the label panel');
    await LabelPanelUtils.verifyLabelRenamed();
});
