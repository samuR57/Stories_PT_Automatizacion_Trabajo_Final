const { When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

let createdStoryTitle;

When('I create a new story with title {string} and description {string} with assigned points', async function (title, description) {
    createdStoryTitle = title;
    console.log(`Creating story with title "${title}" and description "${description}" with assigned points`);
    await StoryUtils.createStory(title, description);
});

Then('the story with points should appear in the backlog', async function () {
    console.log("Verifying the story with points appears in the backlog");
    await StoryUtils.verifyStoryInBacklog(createdStoryTitle);
});

Then('I should be able to press the "Start" button for the story', async function () {
    console.log("Pressing Start button for the story with points");
    await StoryUtils.pressStartButton();
    await StoryUtils.selectRandomPoints();
    await StoryUtils.pressStartButton();
});

Then('the story should move to "Started" and show the "Finish" button', async function () {
    console.log("Verifying the story moves to Started and shows the Finish button");
    await StoryUtils.verifyFinishButton();
});

Then('the story should move to "My Work"', async function () {
    console.log("Verifying the story moves to My Work");
    await StoryUtils.verifyStoryMovedToMyWork();
});
