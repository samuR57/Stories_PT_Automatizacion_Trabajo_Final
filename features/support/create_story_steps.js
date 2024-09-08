const { When, Then } = require("@cucumber/cucumber");
const StoryUtils = require("./story_utils");

When('I create a new story in backlog panel with following information:', async function(dataTable) {
    this.projectName = await StoryUtils.createNewStory(dataTable);
});

Then('I should see the story with name: {string} in backlog panel', async function(storyName) {
    await StoryUtils.verifyStoryInBacklog(this.projectName);
});

Then('I should see the story in backlog panel with following information:', async function(dataTable) {
    await StoryUtils.verifyStoryInformationInBacklog(this.projectName, dataTable);
});

Then('I should see the the popup window with title: {string}', async function(title) {
    await StoryUtils.verifyPopupWindowTitle(title);
});