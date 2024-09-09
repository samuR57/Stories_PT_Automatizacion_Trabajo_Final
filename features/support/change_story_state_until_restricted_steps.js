const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./utils_backlog_story_creation');
const StoryPointsUtils = require('./utils_backlog_story_points');
const StoryButtonsUtils = require('./utils_backlog_story_buttons');
const StoryVerificationUtils = require('./utils_backlog_story_verification');

Given('I have created multiple stories in the backlog for move histories accepted', async function () {
    console.log('I have created multiple stories in the backlog for move histories accepted');
    await StoryCreationUtils.createMultipleStories(5);
});

When('I start, finish, deliver, accept, and collapse the story', async function () {
    console.log('Changing the story state from unstarted to accepted and collapsing');
    
    await StoryButtonsUtils.enterStory();
    await StoryPointsUtils.openStoryPointsDropdown();
    await StoryPointsUtils.selectRandomPoints(); 
    await StoryButtonsUtils.pressStartButton();
    await StoryButtonsUtils.pressFinishButton();
    await StoryButtonsUtils.pressDeliverButton();
    await StoryButtonsUtils.pressAcceptButton();
    await StoryButtonsUtils.pressCollapseButton();
});

Then('the accepted story should not be movable within the backlog', async function () {
    console.log('Verifying that the accepted story cannot be moved');
    await StoryVerificationUtils.verifyStoryCannotBeMoved();
});
