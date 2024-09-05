const { When, Then } = require("@cucumber/cucumber");
const StoryUtils = require("./story_utils");

let createdStoryTitle;

When('I create a new story with title {string} and description {string} without assigning points', async function (title, description) {
    console.log(`I create a new story with title "${title}" and description "${description}" without assigning points`);
    createdStoryTitle = title;
    await StoryUtils.createStory(title, description);
});

Then('the story should appear in the backlog', async function () {
    console.log("Verifying the story appears in the backlog");
    await StoryUtils.verifyStoryInBacklog(createdStoryTitle);
});

Then('I should not be able to press the "Start" button for the story', async function () {
    console.log('I should not be able to press the "Start" button for the story');
    await StoryUtils.pressStartButton();
    await StoryUtils.selectUnestimatedOption();
});

Then('the story should not move to "My Work"', async function () {
    console.log('Verifying the story does not move to "My Work"');
    await StoryUtils.verifyStoryNotMovedToMyWork();
});
