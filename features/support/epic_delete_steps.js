const { Given, When, Then } = require('@cucumber/cucumber');
const EpicPanelUtils = require('../support/utils_epic_panel');

Given('I have created a new Epic', async function() {
    console.log('I have created a new Epic');
    await EpicPanelUtils.openEpicPanel();
    await EpicPanelUtils.clickAddEpicButton();
    await EpicPanelUtils.enterEpicDetails();
    await EpicPanelUtils.saveEpic();
    await EpicPanelUtils.verifyEpicCreated();
});

When('I open the newly created Epic', async function() {
    console.log('I open the newly created Epic');
    await EpicPanelUtils.openCreatedEpic();
});

When('I press the delete button', async function() {
    console.log('I press the delete button');
    await EpicPanelUtils.clickDeleteEpicButton();
});

When('I confirm the deletion', async function() {
    console.log('I confirm the deletion');
    await EpicPanelUtils.confirmEpicDeletion();
});