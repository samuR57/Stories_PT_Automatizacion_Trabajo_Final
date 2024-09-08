const { When, Then } = require("@cucumber/cucumber");
const StoryUtils = require("../../features/support/story_utils");
const chai = require('chai');
const expect = chai.expect;

When('I delete the feature type story from the backlog', async function() {
    console.log("I delete the feature type story from the backlog");
    await StoryUtils.deleteFeatureStory();
});