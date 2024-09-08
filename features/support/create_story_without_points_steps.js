const { When, Then } = require("@cucumber/cucumber");
const StoryCreationUtils = require("./story_creation_utils");  
const StoryVerificationUtils = require("./story_verification_utils");  
const StoryButtonsUtils = require("./story_buttons_utils");  
const StoryPointsUtils = require("./story_points_utils");  

let createdStoryTitle;

When('I create a new story with title {string} and description {string} without assigning points', async function (title, description) {
    console.log(`I create a new story with title "${title}" and description "${description}" without assigning points`);
    createdStoryTitle = title;
    await StoryCreationUtils.createStory(title, description);  
});

Then('the story should appear in the backlog', async function () {
    console.log("Verifying the story appears in the backlog");
    await StoryVerificationUtils.verifyStoryInBacklog(createdStoryTitle);  
});

Then('I should not be able to press the "Start" button for the story', async function () {
    console.log('I should not be able to press the "Start" button for the story');
    await StoryButtonsUtils.enterStory(); 
    await StoryButtonsUtils.pressStartButton(); 
    await StoryPointsUtils.selectUnestimatedOption();  
});

Then('the story should not move to "My Work"', async function () {
    console.log('Verifying the story does not move to "My Work"');
    await StoryVerificationUtils.verifyStoryNotMovedToMyWork();  
});
