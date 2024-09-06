const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I create a new story with title {string} and description {string}', async function (title, description) {
    console.log(`Created a story with title "${title}" and description "${description}"`);
    await StoryUtils.createStory(title, description);
});

When('I enter the story and add a blocker', async function () {
    console.log('Added a blocker to the story and cancelled the second blocker creation');
    await StoryUtils.enterStory();
    await StoryUtils.addBlocker();
});

When('I attempt to accept the blocked story', async function () {
    console.log('Attempted to accept the blocked story');
    await StoryUtils.pressStartButton();
    await StoryUtils.selectRandomPoints();
    await StoryUtils.pressStartButton();
    await StoryUtils.pressFinishButton();
    await StoryUtils.pressDeliverButton();
    await StoryUtils.pressAcceptButton();
});

Then('I should see a warning message about the unresolved blocker and cancel it', async function () {
    console.log('Verified the warning message and cancelled the action');
    await StoryUtils.verifyWarningPopupAndCancel();
});
