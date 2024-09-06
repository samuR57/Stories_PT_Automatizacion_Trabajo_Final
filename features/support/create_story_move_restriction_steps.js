const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I will create 5 stories for the backlog', async function () {
    console.log('I will create 5 stories for the backlog');
    await StoryUtils.createMultipleStories(5);
});

When('I enter a story and press the "Start" button', async function () {
    console.log('I enter a story and press the "Start" button');
    await StoryUtils.enterStory();
    await StoryUtils.pressStartButton();
    await StoryUtils.selectRandomPoints();
    await StoryUtils.pressStartButton();
    await StoryUtils.verifyStoryMovedToMyWork();
});

Then('I should not be able to move the started story below unstarted stories', async function () {
    console.log('I should not be able to move the started story below unstarted stories')
    await StoryUtils.moveStartedStoryBelowUnstarted();
});