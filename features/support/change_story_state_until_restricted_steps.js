const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I have created multiple stories in the backlog for move histories accepted', async function () {
    console.log('Creating multiple stories in the backlog...');
    await StoryUtils.createMultipleStories(5);
    console.log('Created multiple stories in the backlog');
});

When('I start, finish, deliver, accept, and collapse the story', async function () {
    console.log('Changing the story state from unstarted to accepted and collapsing...');
    
    await StoryUtils.enterStory(); 
    await StoryUtils.openStoryPointsDropdown();
    await StoryUtils.selectRandomPoints();   
    await StoryUtils.pressStartButton();     
    await StoryUtils.pressFinishButton();  
    await StoryUtils.pressDeliverButton(); 
    await StoryUtils.pressAcceptButton();  
    await StoryUtils.pressCollapseButton();  
});

Then('the accepted story should not be movable within the backlog', async function () {
    console.log('Verifying that the accepted story cannot be moved...');
    await StoryUtils.verifyStoryCannotBeMoved();
});