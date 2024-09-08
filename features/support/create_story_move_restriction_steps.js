const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./story_creation_utils');
const StoryMovementUtils = require('./story_movement_utils');
const StoryVerificationUtils = require('./story_verification_utils');
const StoryPointsUtils = require('./story_points_utils');
const StoryButtonsUtils = require('./story_buttons_utils');

Given('I will create 5 stories for the backlog', async function () {
    console.log('I will create 5 stories for the backlog');
    await StoryCreationUtils.createMultipleStories(5); 
});

When('I enter a story and press the "Start" button', async function () {
    console.log('I enter a story and press the "Start" button');
    await StoryButtonsUtils.enterStory(); 
    await StoryButtonsUtils.pressStartButton(); 
    await StoryPointsUtils.selectRandomPoints(); 
    await StoryButtonsUtils.pressStartButton(); 
    await StoryVerificationUtils.verifyStoryMovedToMyWork();  
});

Then('I should not be able to move the started story below unstarted stories', async function () {
    console.log('I should not be able to move the started story below unstarted stories');
    await StoryMovementUtils.moveStartedStoryBelowUnstarted();  
});