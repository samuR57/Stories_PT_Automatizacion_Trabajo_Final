const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I create a new story with title {string} and description {string}', async function (title, description) {
    await StoryUtils.createStory(title, description);
    console.log(`Created a story with title "${title}" and description "${description}"`);
});

When('I enter the story and add a blocker', async function () {
    await StoryUtils.enterStory();
    await StoryUtils.addBlocker();
    console.log('Added a blocker to the story and cancelled the second blocker creation');
});

When('I attempt to accept the blocked story', async function () {
    await StoryUtils.pressStartButton();
    await StoryUtils.selectRandomPoints();
    await StoryUtils.pressStartButton();
    await StoryUtils.pressFinishButton();
    await StoryUtils.pressDeliverButton();
    await StoryUtils.pressAcceptButton();
    console.log('Attempted to accept the blocked story');
});

Then('I should see a warning message about the unresolved blocker and cancel it', async function () {
    await StoryUtils.verifyWarningPopupAndCancel();
    console.log('Verified the warning message and cancelled the action');
});
