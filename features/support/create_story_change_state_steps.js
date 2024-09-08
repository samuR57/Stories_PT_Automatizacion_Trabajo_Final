const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./story_creation_utils');
const StoryButtonsUtils = require('./story_buttons_utils');
const StoryPointsUtils = require('./story_points_utils');
const StoryVerificationUtils = require('./story_verification_utils');

Given('I create a specific story with title {string} and description {string}', async function (title, description) {
    console.log(`Story created with title: "${title}" and description: "${description}"`);
    await StoryCreationUtils.createStory(title, description);
});

When('I enter the story and start it', async function () {
    console.log('Started the story');
    await StoryButtonsUtils.enterStory();  
    await StoryButtonsUtils.pressStartButton();    
    await StoryPointsUtils.selectRandomPoints();  
    await StoryButtonsUtils.pressStartButton();   
});

Then('the story should be moved to My Work', async function () {
    console.log('The story was moved to My Work');
    await StoryVerificationUtils.verifyStoryMovedToMyWork(); 
});

When('I change the state of the story to "Unstarted"', async function () {
    console.log('Changed the story state to "Unstarted"');
    await StoryButtonsUtils.enterStory();   
    await StoryButtonsUtils.openStoryStateDropdown();   
    await StoryButtonsUtils.selectStoryStateUnstartedOption(); 
    await StoryButtonsUtils.pressCollapseButton();  
});

Then('the story should remain in My Work', async function () {
    console.log('The story remains in My Work');
    await StoryVerificationUtils.verifyStoryRemainsInMyWork();
});
