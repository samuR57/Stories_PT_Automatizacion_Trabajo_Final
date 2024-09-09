const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./utils_backlog_story_creation');
const StoryMovementUtils = require('./utils_backlog_story_movement');
const StoryVerificationUtils = require('./utils_backlog_story_verification');
const StoryPointsUtils = require('./utils_backlog_story_points');
const StoryButtonsUtils = require('./utils_backlog_story_buttons');
const ProjectManagementPanel = require('./utils_project_management_panel');

Given('I will create 5 stories for the backlog', async function () {
    console.log('I will create 5 stories for the backlog');
    await ProjectManagementPanel.openRandomBacklogOrIceboxPanel();
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