const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I create a specific story with title {string} and description {string}', async function (title, description) {
    console.log(`Story created with title: "${title}" and description: "${description}"`);
    await StoryUtils.createStory(title, description);
});

When('I enter the story and start it', async function () {
    console.log('Started the story');
    await StoryUtils.enterStory();
    await StoryUtils.pressStartButton();
    await StoryUtils.selectRandomPoints();
    await StoryUtils.pressStartButton();
});

Then('the story should be moved to My Work', async function () {
    console.log('The story was moved to My Work');
    await StoryUtils.verifyStoryMovedToMyWork();
});

When('I change the state of the story to "Unstarted"', async function () {
    console.log('Changed the story state to "Unstarted"');
    await StoryUtils.enterStory();
    await StoryUtils.openStoryStateDropdown();
    await StoryUtils.selectStoryStateUnstartedOption();
    await StoryUtils.pressCollapseButton();
});

Then('the story should remain in My Work', async function () {
    console.log('The story remains in My Work');
    await StoryUtils.verifyStoryRemainsInMyWork();
});
