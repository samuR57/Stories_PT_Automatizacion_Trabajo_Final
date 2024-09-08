const { Given, When, Then } = require('@cucumber/cucumber');
const StoryButtonsUtils = require('./story_buttons_utils');
const StoryVerificationUtils = require('./story_verification_utils');
const StoryMovementUtils = require('./story_movement_utils');

Given('the Current Iteration_Backlog panel is active', async function () {
    console.log('the Current Iteration_Backlog panel is active');
    try {
        await StoryVerificationUtils.verifyCurrentBacklogTabActive();
    } catch (error) {
        await StoryButtonsUtils.activateCurrentBacklogTab();
    }
});

When('I split the Current Iteration and Backlog panels', async function () {
    console.log('I split the Current Iteration and Backlog panels');
    await StoryButtonsUtils.splitCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be separated', async function () {
    console.log('the Current Iteration and Backlog panels should be separated');
    await StoryVerificationUtils.verifyPanelsSeparated();
});

When('I combine the Current Iteration and Backlog panels', async function () {
    console.log('I combine the Current Iteration and Backlog panels');
    await StoryButtonsUtils.combineCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be combined', async function () {
    console.log('the Current Iteration and Backlog panels should be combined');
    await StoryVerificationUtils.verifyPanelsCombined();
});
