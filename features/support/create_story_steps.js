const { When, Then } = require("@cucumber/cucumber");
const StoryCreationUtils = require('./story_creation_utils');
const StoryVerificationUtils = require('./story_verification_utils');

When('I create a new story in backlog panel with following information:', async function(dataTable) {
    console.log("I create a new story in backlog panel with following information:");
    this.projectName = await StoryCreationUtils.createNewStory(dataTable); 
});

Then('I should see the story with name: {string} in backlog panel', async function(storyName) {
    console.log("I should see the story with name: {string} in backlog panel");
    await StoryVerificationUtils.verifyStoryInBacklog(this.projectName); 
});

Then('I should see the story in backlog panel with following information:', async function(dataTable) {
    console.log("I should see the story in backlog panel with following information:");
    await StoryVerificationUtils.verifyStoryInformationInBacklog(this.projectName, dataTable);  
});

Then('I should see the the popup window with title: {string}', async function(title) {
    console.log("I should see the the popup window with title: {string}");
    await StoryVerificationUtils.verifyPopupWindowTitle(title); 
});
