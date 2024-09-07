const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I have created multiple stories in the backlog and modify one', async function () {
    console.log('Created multiple stories in the backlog');
    await StoryUtils.createMultipleStories(5);
});

When('I start, finish, deliver, and accept the story', async function () {
    console.log('Changing the story state from unstarted to accepted');
    await StoryUtils.enterStory();  
    await StoryUtils.openStoryPointsDropdown(); 
    await StoryUtils.selectRandomPoints();  
    await StoryUtils.pressStartButton();  
    await StoryUtils.pressFinishButton();   
    await StoryUtils.pressDeliverButton();
    await StoryUtils.pressAcceptButton();  
    await StoryUtils.pressCollapseButton();   
});

Then('the accepted story should appear in the accepted stories dropdown', async function () {
    console.log('Verifying that the accepted story appears in the accepted stories dropdown');
    await StoryUtils.verifyStoryInAcceptedDropdown();  
});

Then('the number of accepted stories should be {int}', async function (expectedCount) {
    console.log(`Verifying that the number of accepted stories is ${expectedCount}`);
    await StoryUtils.verifyAcceptedStoryCount(expectedCount);
});