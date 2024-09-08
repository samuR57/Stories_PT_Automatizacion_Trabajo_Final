const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./story_creation_utils');
const StoryPointsUtils = require('./story_points_utils');
const StoryButtonsUtils = require('./story_buttons_utils');
const StoryVerificationUtils = require('./story_verification_utils');

Given('I have created multiple stories in the backlog and modify one', async function () {
    console.log('Created multiple stories in the backlog');
    await StoryCreationUtils.createMultipleStories(5);
});

When('I start, finish, deliver, and accept the story', async function () {
    console.log('Changing the story state from unstarted to accepted');
    await StoryButtonsUtils.enterStory(); 
    await StoryPointsUtils.openStoryPointsDropdown(); 
    await StoryPointsUtils.selectRandomPoints();
    await StoryButtonsUtils.pressStartButton(); 
    await StoryButtonsUtils.pressFinishButton(); 
    await StoryButtonsUtils.pressDeliverButton();
    await StoryButtonsUtils.pressAcceptButton(); 
    await StoryButtonsUtils.pressCollapseButton();
});

Then('the accepted story should appear in the accepted stories dropdown', async function () {
    console.log('Verifying that the accepted story appears in the accepted stories dropdown');
    await StoryVerificationUtils.verifyStoryInAcceptedDropdown(); 
});

Then('the number of accepted stories should be {int}', async function (expectedCount) {
    console.log(`Verifying that the number of accepted stories is ${expectedCount}`);
    await StoryVerificationUtils.verifyAcceptedStoryCount(expectedCount); 
});
