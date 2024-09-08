const { When, Then } = require("@cucumber/cucumber");
const StoryUtils = require("../../features/support/story_utils");
const chai = require('chai');
const expect = chai.expect;

When('I delete the bug type story from the backlog', async function() {
    console.log("I delete the bug type story from the backlog");
    await StoryUtils.deleteBugStory();
});

Then('I should see the backlog empty', async function() {
    console.log("I should see the backlog empty");
    const isBacklogEmpty = await StoryUtils.isBacklogEmpty();
    expect(isBacklogEmpty).to.be.true;
});
