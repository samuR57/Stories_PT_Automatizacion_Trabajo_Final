const { Given, When, Then } = require('@cucumber/cucumber');
const StoryUtils = require('./story_utils');

Given('the Current Iteration_Backlog panel is active', async function () {
    try {
        await StoryUtils.verifyCurrentBacklogTabActive();
        console.log('El panel Current Iteration/Backlog ya está activo.');
    } catch (error) {
        console.log('El panel Current Iteration/Backlog no está activo. Activando...');
        await StoryUtils.activateCurrentBacklogTab();
    }
});

When('I split the Current Iteration and Backlog panels', async function () {
    console.log('Dividiendo los paneles Current Iteration y Backlog...');
    await StoryUtils.splitCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be separated', async function () {
    console.log('Verificando que los paneles Current Iteration y Backlog se han separado...');
    await StoryUtils.verifyPanelsSeparated();
});

When('I combine the Current Iteration and Backlog panels', async function () {
    console.log('Combinando los paneles Current Iteration y Backlog...');
    await StoryUtils.combineCurrentAndBacklog();
});

Then('the Current Iteration and Backlog panels should be combined', async function () {
    console.log('Verificando que los paneles Current Iteration y Backlog se han combinado...');
    await StoryUtils.verifyPanelsCombined();
});
