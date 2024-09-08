const DriverFactory = require("../../core/ui/driverFactory");
const StoriesTab = require("../../main/ui/stories_tab");
const StoryPanel = require("../../main/ui/story_panel");
const StoriesPage = require("../../main/ui/stories_page");
const { until, Key } = require("selenium-webdriver");
const configuration = require("../../configuration.json");
const RandomValues = require("../../features/support/random_values");
const environment = require("../../environment.json");

class StoryCreationUtils {

    // Crear una nueva historia en el panel de backlog con la información proporcionada
    static async createNewStory(dataTable) {
        const addStoryButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesTab.addStoryButton));
        await DriverFactory.myDriver.wait(until.elementIsVisible(addStoryButton), configuration.browser.timeout);
        await addStoryButton.click();

        const storyTitleTextField = await DriverFactory.myDriver.wait(until.elementLocated(StoryPanel.storyTitleTextField));
        const storyTypeDropdown = await DriverFactory.myDriver.wait(until.elementLocated(StoryPanel.storyTypeDropdown));
        const ownerPlusIcon = await DriverFactory.myDriver.wait(until.elementLocated(StoryPanel.ownerPlusIcon));

        const projectName = RandomValues.getRandomValues(dataTable.rowsHash().Title);
        await storyTitleTextField.sendKeys(projectName);
        await storyTypeDropdown.click();

        StoryPanel.locatorAux.value = StoryPanel.storyOptionInDropdown.value.replace("{0}", dataTable.rowsHash().StoryType.toLowerCase());
        const optionSelectedInDropdown = await DriverFactory.myDriver.wait(until.elementLocated(StoryPanel.locatorAux));
        await optionSelectedInDropdown.click();

        if (dataTable.rowsHash().Owners !== undefined) {
            await ownerPlusIcon.click();
            const ownerList = await DriverFactory.myDriver.wait(until.elementsLocated(StoryPanel.ownerSelect));
            for (let i = 0; i < ownerList.length; i++) {
                const element = ownerList.pop();
                if ((await element.getText()).toString() === environment.prod.userMember01.name)
                    await element.click();
            }
        }

        const saveButton = await DriverFactory.myDriver.wait(until.elementLocated(StoryPanel.saveButton));
        await saveButton.sendKeys(Key.SHIFT);
        await saveButton.click();
        await DriverFactory.myDriver.wait(until.elementIsVisible(addStoryButton), configuration.browser.timeout);

        return projectName;  // Devuelve el nombre de la historia creada
    }

    // Crea una nueva historia en el backlog con el título y la descripción proporcionados
    static async createStory(title, description) {
        const backlogTabInactive = await DriverFactory.myDriver.findElements(StoriesPage.currentBacklogTabInactive);
        if (backlogTabInactive.length > 0) {
            await backlogTabInactive[0].click();
        }

        const addStoryButton = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.addStoryButton), 10000);
        await addStoryButton.click();

        const storyTitleInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyTitleInput), 10000);
        await storyTitleInput.sendKeys(title);

        const storyDescriptionInput = await DriverFactory.myDriver.wait(until.elementLocated(StoriesPage.storyDescriptionInput), 10000);
        await storyDescriptionInput.click();
        await storyDescriptionInput.sendKeys(description);

        const saveStoryButton = await DriverFactory.myDriver.findElement(StoriesPage.saveStoryButton);
        await saveStoryButton.click();
    }

    // Crea múltiples historias en el backlog y luego refresca la página
    static async createMultipleStories(numberOfStories) {
        for (let i = 0; i < numberOfStories; i++) {
            const randomTitle = RandomValues.getRandomValues(`<StoryTitle, 6>`);
            await this.createStory(randomTitle, "");
        }

        await DriverFactory.myDriver.navigate().refresh();
        await DriverFactory.myDriver.sleep(5000);
    }
}

module.exports = StoryCreationUtils;