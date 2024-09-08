const { When, Then } = require("@cucumber/cucumber");
const StoryButtonsUtils = require("./story_buttons_utils");  
const StoryVerificationUtils = require("./story_verification_utils");  
const chai = require('chai');
const expect = chai.expect;

When('I delete the bug type story from the backlog', async function() {
    console.log("I delete the bug type story from the backlog");
    await StoryButtonsUtils.deleteBugStory();  
});

Then('I should see the backlog empty', async function() {
    console.log("I should see the backlog empty");
    const isBacklogEmpty = await StoryVerificationUtils.isBacklogEmpty(); 
    expect(isBacklogEmpty).to.be.true;
});
