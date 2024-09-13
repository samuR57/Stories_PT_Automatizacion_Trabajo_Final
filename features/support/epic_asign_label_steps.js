const { Given, When, Then } = require('@cucumber/cucumber');
const EpicPanelUtils = require('../support/utils_epic_panel');
const LabelPanelUtils = require('../support/utils_label_panel');

Given('I have created a label to assign to the Epic', async function() {
    console.log('I have created a label to assign to the Epic');
    await LabelPanelUtils.openLabelPanel();
    await LabelPanelUtils.clickAddLabelButton();
    await LabelPanelUtils.enterRandomLabelName();
    await LabelPanelUtils.clickConfirmAddLabelButton();
    await LabelPanelUtils.verifyLabelCreated();
});

When('I add a new Epic', async function() {
    console.log('I add a new Epic');
    await EpicPanelUtils.openEpicPanel();
    await EpicPanelUtils.clickAddEpicButton();
    await EpicPanelUtils.enterEpicDetails();
});

When('I open the label dropdown in the Epic', async function() {
    console.log('I open the label dropdown in the Epic');
    await EpicPanelUtils.openLabelDropdownInEpic();
});

When('I select the created label from the dropdown for epic', async function() {
    console.log('I select the created label from the dropdown for epic');
    await EpicPanelUtils.selectLabelFromDropdown(LabelPanelUtils.generatedLabelName); 
});

When('I save the Epic with the label assigned', async function() {
    console.log('I save the Epic with the label assigned');
    await EpicPanelUtils.saveEpic();
    await EpicPanelUtils.verifyEpicCreated();
});

Then('I verify that the label is assigned to the Epic', async function() {
    console.log('I verify that the label is assigned to the Epic');
    await EpicPanelUtils.verifyLabelAssignedToEpic(LabelPanelUtils.generatedLabelName); 
});
