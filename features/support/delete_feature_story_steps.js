const { When } = require("@cucumber/cucumber");
const StoryButtonsUtils = require("./story_buttons_utils");

When('I delete the feature type story from the backlog', async function() {
    console.log("I delete the feature type story from the backlog");
    await StoryButtonsUtils.deleteFeatureStory(); 
});