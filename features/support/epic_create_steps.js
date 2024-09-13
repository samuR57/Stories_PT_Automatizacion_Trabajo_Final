const { Given, When, Then } = require('@cucumber/cucumber');
const EpicPanelUtils = require('./utils_epic_panel');

Given('all panels except the Epics panel are closed', async function() {
    console.log('all panels except the Epics panel are closed');
    await EpicPanelUtils.openEpicPanel();
});

When('I press the button to add a new Epic', async function() {
    console.log('I press the button to add a new Epic');
    await EpicPanelUtils.clickAddEpicButton();
});

When('I enter a title for the Epic', async function() {
    console.log('I enter a title for the Epic');
    await EpicPanelUtils.enterEpicDetails();
});

When('I press the button to save the Epic', async function() {
    console.log('I press the button to save the Epic');
    await EpicPanelUtils.saveEpic();
});

Then('I verify that the Epic was created', async function() {
    console.log('I verify that the Epic was created');
    await EpicPanelUtils.verifyEpicCreated();
});
