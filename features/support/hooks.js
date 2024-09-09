const { Before, After, AfterAll, BeforeAll } = require("@cucumber/cucumber");
const environment = require("../../environment.json");
const configuration = require("../../configuration.json");
const DriverFactory = require("../../core/ui/driverFactory");
var {setDefaultTimeout} = require('@cucumber/cucumber');
const CommonFlows = require("../../features/support/commonFlows");

setDefaultTimeout(60 * 1000);
let loginHook = false;
let isCookieEnabled = false;
let defaultProjectId

BeforeAll( { tags: "@ui" }, async function(){
    console.log("Starting Framework");
    this.driver = await new DriverFactory();
    console.log("Starting Browser");
    await this.driver.get("https://www.pivotaltracker.com/signin?source=navbar");
    await this.driver.manage().window().setRect(configuration.browser.resolution);
});

Before( { tags: "@login" }, async function(scenario){
    console.log("TEST SCENARIO: " + scenario.pickle.name.toLocaleUpperCase());
    if ((loginHook === undefined) || (loginHook === false)){
        loginHook = await CommonFlows.login(scenario, isCookieEnabled);
        isCookieEnabled = true;
        defaultProjectId = await CommonFlows.createDefaultProject();
    }
});

Before( { tags: "@createFirstProject" }, async function(){
    this.firstProjectId = await CommonFlows.createFirstProject();
    this.createFirstProjectHook = true;
});

Before( { tags: "@addAMemberToProject" }, async function(){
    if ((this.addAMemberToProjectHook === undefined) || (this.addAMemberToProjectHook === false)){
        this.addAMemberToProjectHook = await CommonFlows.addAMemberToProject();
    }
});

After({ tags: "@deleteFirstProject" }, async function(){
    this.firstProjectId = await CommonFlows.deleteFirstProject(this.firstProjectId);
});

Before({ tags: "@createBugStory or @createFeatureStory" }, async function(scenario){
    if (!this.createFeatureStoryHook){
        this.createFeatureStoryHook = await CommonFlows.createStory(scenario);
    }
});

AfterAll({ tags: "@ui" },async function(){
    await CommonFlows.deleteDefaultProject(defaultProjectId);
    await DriverFactory.closeDriver();
});
