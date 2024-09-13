const { Given, When, Then } = require('@cucumber/cucumber');
const StoryButtonsUtils = require('./utils_backlog_story_buttons');
const StoryVerificationUtils = require('./utils_backlog_story_verification');

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
