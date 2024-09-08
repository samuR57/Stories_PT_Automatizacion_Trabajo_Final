const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./story_creation_utils');
const StoryButtonsUtils = require('./story_buttons_utils');
const StoryPointsUtils = require('./story_points_utils');
const StoryVerificationUtils = require('./story_verification_utils');

Given('I create a new story with title {string} and description {string}', async function (title, description) {
    console.log(`Created a story with title "${title}" and description "${description}"`);
    await StoryCreationUtils.createStory(title, description); 
});

When('I enter the story and add a blocker', async function () {
    console.log('Added a blocker to the story and cancelled the second blocker creation');
    await StoryButtonsUtils.enterStory();  
    await StoryButtonsUtils.addBlocker();  
});

When('I attempt to accept the blocked story', async function () {
    console.log('Attempted to accept the blocked story');
    await StoryButtonsUtils.pressStartButton(); 
    await StoryPointsUtils.selectRandomPoints();  
    await StoryButtonsUtils.pressStartButton();  
    await StoryButtonsUtils.pressFinishButton();  
    await StoryButtonsUtils.pressDeliverButton(); 
    await StoryButtonsUtils.pressAcceptButton();  
});

Then('I should see a warning message about the unresolved blocker and cancel it', async function () {
    console.log('Verified the warning message and cancelled the action');
    await StoryVerificationUtils.verifyWarningPopupAndCancel();
});
