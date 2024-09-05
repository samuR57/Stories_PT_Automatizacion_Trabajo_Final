const { When, Then } = require("@cucumber/cucumber");
const StoryUtils = require("./story_utils");

let createdStoryTitle;

When('I create a new story with title {string} and description {string} without assigning points', async function (title, description) {
    createdStoryTitle = title;
    await StoryUtils.createStory(title, description);
});

Then('the story should appear in the backlog', async function () {
    await StoryUtils.verifyStoryInBacklog(createdStoryTitle);
});

Then('I should not be able to press the "Start" button for the story', async function () {
    await StoryUtils.pressStartButton();
    await StoryUtils.selectUnestimatedOption();
});

Then('the story should not move to "My Work"', async function () {
    await StoryUtils.verifyStoryNotMovedToMyWork();
});
