const { When, Then, Given } = require("@cucumber/cucumber");
const StoryCreationUtils = require("./utils_backlog_story_creation");
const StoryButtonsUtils = require("./utils_backlog_story_buttons");
const StoryPointsUtils = require("./utils_backlog_story_points");
const ProjectManagementPanel = require('./utils_project_management_panel');

Given('I create a story with title {string} and description {string} to add tasks', async function(title, description) {
    console.log('I create a story with title and description to add tasks');
    await ProjectManagementPanel.openRandomBacklogOrIceboxPanel();
    await StoryCreationUtils.createStory(title, description);
});

When('I complete data in the story', async function() {
    console.log('I complete data in the story');
    await StoryButtonsUtils.enterStory(); 
    await StoryButtonsUtils.pressStartButton(); 
    await StoryPointsUtils.selectRandomPoints();
    await StoryButtonsUtils.pressCollapseButton(); 
});

When('I add random tasks to the story', async function() {
    console.log('I add random tasks to the story');
    await StoryButtonsUtils.enterStory();
    await StoryButtonsUtils.enableTaskInputField(); 
    await StoryButtonsUtils.addRandomTasksToStory();
    await StoryButtonsUtils.pressCollapseButton();
});

Then('I mark tasks as complete', async function() {
    console.log('I mark tasks as complete');
    await StoryButtonsUtils.enterStory();
    await StoryButtonsUtils.markTaskAsComplete();
    await StoryButtonsUtils.pressCollapseButton();
});