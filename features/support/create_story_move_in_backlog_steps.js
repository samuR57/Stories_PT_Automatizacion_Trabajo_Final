const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I have created multiple stories in the backlog', async function () {
    await StoryUtils.createMultipleStories(5);
    console.log('Created multiple stories in the backlog');
});

When('I move the first story to the top of the backlog', async function () {
    console.log('Moving a story to the top of the backlog');
    await StoryUtils.moveStoryInBacklog();
});

Then('the story should be moved to the new position', async function () {
    console.log('Verifying that the story was moved to the new position');
    await StoryUtils.verifyStoryMovedInBacklog();  // Ya no es necesario pasar un título
});
