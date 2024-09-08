const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('the Current Iteration_Backlog panel is active', async function () {
    console.log('the Current Iteration_Backlog panel is active');
    try {
        await StoryUtils.verifyCurrentBacklogTabActive();
    } catch (error) {;
        await StoryUtils.activateCurrentBacklogTab();
    }
});

When('I split the Current Iteration and Backlog panels', async function () {
    console.log('I split the Current Iteration and Backlog panels');
    await StoryUtils.splitCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be separated', async function () {
    console.log('the Current Iteration and Backlog panels should be separated');
    await StoryUtils.verifyPanelsSeparated();
});

When('I combine the Current Iteration and Backlog panels', async function () {
    console.log('I combine the Current Iteration and Backlog panels');
    await StoryUtils.combineCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be combined', async function () {
    console.log('the Current Iteration and Backlog panels should be combined');
    await StoryUtils.verifyPanelsCombined();
});
