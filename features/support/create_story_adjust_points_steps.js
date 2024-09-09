const { Given, When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./utils_backlog_story_creation');
const StoryPointsUtils = require('./utils_backlog_story_points');
const StoryButtonsUtils = require('./utils_backlog_story_buttons');

Given('I create and adjust story with title {string} and description {string}', async function (title, description) {
    console.log(`Creating story with title: "${title}" and description: "${description}"`);
    await StoryCreationUtils.createStory(title, description); 
});

When('I set the story points to 0', async function () {
    console.log('Setting story points to 0');
    await StoryButtonsUtils.enterStory();  
    await StoryPointsUtils.openStoryPointsDropdown(); 
    await StoryPointsUtils.select0Points(); 
    await StoryButtonsUtils.pressCollapseButton(); 
});

When('I set the iteration length to {int} week', async function (weeks) {
    console.log(`Setting iteration length to ${weeks} week(s)`);
    await StoryPointsUtils.openIterationLengthConfig(); 
    await StoryPointsUtils.applyIterationLength(weeks); 
});

When('I set the velocity to {int}', async function (velocity) {
    console.log(`Setting velocity to ${velocity}`);
    await StoryPointsUtils.openVelocityConfig(); 
    await StoryPointsUtils.applyVelocity(velocity); 
});

Then('I save the current iteration date', async function () {
    console.log('Saving the current iteration date');
    await StoryPointsUtils.saveIterationDate(); 
});

When('I change the story points to 3', async function () {
    console.log('Changing story points to 3');
    await StoryButtonsUtils.enterStory();   
    await StoryPointsUtils.openStoryPointsDropdown(); 
    await StoryPointsUtils.select3Points();
    await StoryButtonsUtils.pressCollapseButton();  
});

Then('the iteration date should have changed', async function () {
    console.log('Verifying that the iteration date has changed');
    await StoryPointsUtils.saveIterationDateLast(); 
    await StoryPointsUtils.compareIterationDates(); 
});
