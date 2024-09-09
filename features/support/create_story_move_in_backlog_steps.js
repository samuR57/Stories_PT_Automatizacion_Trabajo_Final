const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./utils_backlog_story_creation');
const StoryMovementUtils = require('./utils_backlog_story_movement');
const StoryVerificationUtils = require('./utils_backlog_story_verification');

Given('I have created multiple stories in the backlog', async function () {
    await StoryCreationUtils.createMultipleStories(5); 
    console.log('Created multiple stories in the backlog');
});

When('I move the first story to the top of the backlog', async function () {
    console.log('Moving a story to the top of the backlog');
    await StoryMovementUtils.moveStoryInBacklog();
});

Then('the story should be moved to the new position', async function () {
    console.log('Verifying that the story was moved to the new position');
    await StoryVerificationUtils.verifyStoryMovedInBacklog(); 
});
