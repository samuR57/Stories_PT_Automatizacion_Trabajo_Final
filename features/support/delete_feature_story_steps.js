const { When } = require("@cucumber/cucumber");
const StoryButtonsUtils = require("./utils_backlog_story_buttons");

When('I delete the feature type story from the backlog', async function() {
    console.log("I delete the feature type story from the backlog");
    await StoryButtonsUtils.deleteFeatureStory(); 
});