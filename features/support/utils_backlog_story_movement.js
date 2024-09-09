const DriverFactory = require("../../core/ui/driverFactory");
const StoriesPage = require("../../main/ui/stories_page");
const { until } = require("selenium-webdriver");
const configuration = require("../../configuration.json");

class StoryMovementUtils {

    // Mueve cualquier historia dentro del backlog
    static async moveStoryInBacklog() {
        const storiesInBacklog = await DriverFactory.myDriver.wait(
            until.elementsLocated(StoriesPage.storyToMove),
            configuration.browser.timeout
        );

        if (storiesInBacklog.length === 0) {
            throw new Error("No stories found in the backlog");
        }

        const storyToMove = storiesInBacklog[0];
        const lastStory = storiesInBacklog[storiesInBacklog.length - 1];

        await DriverFactory.myDriver.executeScript("arguments[0].scrollIntoView(true);", storyToMove);
        await DriverFactory.myDriver.executeScript("arguments[0].scrollIntoView(true);", lastStory);

        await DriverFactory.myDriver.wait(until.elementIsVisible(storyToMove), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsVisible(lastStory), configuration.browser.timeout);

        const actions = DriverFactory.myDriver.actions({ bridge: true });
        await actions.dragAndDrop(storyToMove, lastStory).perform();
    }

    // Método que intenta mover la historia "Started" debajo de las "Unstarted"
    static async moveStartedStoryBelowUnstarted() {
        const storiesInBacklog = await DriverFactory.myDriver.findElements(StoriesPage.backlogStory);
        const startedStory = storiesInBacklog[0];
        const unstartedStory = storiesInBacklog[1];
        const actions = DriverFactory.myDriver.actions({ bridge: true });
        await actions.dragAndDrop(startedStory, unstartedStory).perform();
    }

}

module.exports = StoryMovementUtils;