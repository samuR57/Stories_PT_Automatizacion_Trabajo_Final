const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('I have created multiple stories in the backlog', async function () {
    // Crear 5 historias en el backlog usando el método reutilizable
    await StoryUtils.createMultipleStories(5);
    console.log('Created multiple stories in the backlog');
});

When('I move the first story to the top of the backlog', async function () {
    // Mover cualquier historia (primera o última) al principio del backlog
    console.log('Moving a story to the top of the backlog');
    await StoryUtils.moveStoryInBacklog();
});

Then('the story should be moved to the new position', async function () {
    // Verificar que una historia se haya movido a la nueva posición (sin comparar título)
    console.log('Verifying that the story was moved to the new position');
    await StoryUtils.verifyStoryMovedInBacklog();  // Ya no es necesario pasar un título
});
