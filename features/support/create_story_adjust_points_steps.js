const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I create and adjust story with title {string} and description {string}', async function (title, description) {
    console.log(`Creating story with title: "${title}" and description: "${description}"`);
    await StoryUtils.createStory(title, description);
});

When('I set the story points to 0', async function () {
    console.log('Setting story points to 0');
    await StoryUtils.enterStory();          
    await StoryUtils.openStoryPointsDropdown();  
    await StoryUtils.select0Points();           
    await StoryUtils.pressCollapseButton();     
});

When('I set the iteration length to {int} week', async function (weeks) {
    console.log(`Setting iteration length to ${weeks} week(s)`);
    await StoryUtils.openIterationLengthConfig();    
    await StoryUtils.applyIterationLength(weeks);    
});

When('I set the velocity to {int}', async function (velocity) {
    console.log(`Setting velocity to ${velocity}`);
    await StoryUtils.openVelocityConfig();    
    await StoryUtils.applyVelocity(velocity); 
});

Then('I save the current iteration date', async function () {
    console.log('Saving the current iteration date');
    await StoryUtils.saveIterationDate();  
});

When('I change the story points to 3', async function () {
    console.log('Changing story points to 3');
    await StoryUtils.enterStory();          
    await StoryUtils.openStoryPointsDropdown();  
    await StoryUtils.select3Points();           
    await StoryUtils.pressCollapseButton();     
});

Then('the iteration date should have changed', async function () {
    console.log('Verifying that the iteration date has changed');
    await StoryUtils.saveIterationDateLast();
    await StoryUtils.compareIterationDates();
});
