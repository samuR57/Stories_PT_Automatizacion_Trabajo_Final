const { When, Then } = require('@cucumber/cucumber');
const StoryCreationUtils = require('./story_creation_utils');  
const StoryPointsUtils = require('./story_points_utils');      
const StoryButtonsUtils = require('./story_buttons_utils');    
const StoryVerificationUtils = require('./story_verification_utils');  

let createdStoryTitle;

When('I create a new story with title {string} and description {string} with assigned points', async function (title, description) {
    createdStoryTitle = title;
    console.log(`Creating story with title "${title}" and description "${description}" with assigned points`);
    await StoryCreationUtils.createStory(title, description);  
});

Then('the story with points should appear in the backlog', async function () {
    console.log("Verifying the story with points appears in the backlog");
    await StoryVerificationUtils.verifyStoryInBacklog(createdStoryTitle);  
});

Then('I should be able to press the "Start" button for the story', async function () {
    console.log("Pressing Start button for the story with points");
    await StoryButtonsUtils.enterStory();  
    await StoryButtonsUtils.pressStartButton(); 
    await StoryPointsUtils.selectRandomPoints();  
    await StoryButtonsUtils.pressStartButton();  
});

Then('the story should move to "Started" and show the "Finish" button', async function () {
    console.log("Verifying the story moves to Started and shows the Finish button");
    await StoryVerificationUtils.verifyFinishButton();  
});

Then('the story should move to "My Work"', async function () {
    console.log("Verifying the story moves to My Work");
    await StoryVerificationUtils.verifyStoryMovedToMyWork(); 
});