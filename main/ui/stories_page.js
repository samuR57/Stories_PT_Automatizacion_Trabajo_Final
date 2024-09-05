const { By } = require("selenium-webdriver");

class StoriesPage {
    // Pestaña Current/backlog
    currentBacklogTabActive = By.css('li[title="Current/backlog"][data-panel-visible="true"]');
    currentBacklogTabInactive = By.css('li[title="Current/backlog"][data-panel-visible="false"]');
    
    // Botón para añadir una nueva historia
    addStoryButton = By.css('button[title="Add Story"]');
    
    // Input para el título de la historia
    storyTitleInput = By.css('textarea[aria-label="story title"]');
    
    // Input para la descripción de la historia
    storyDescriptionInput = By.css('div[data-aid="renderedDescription"]');
    
    // Botón para guardar la historia
    saveStoryButton = By.css('button[title="Save & collapse"]');
    
    // Historia en el Backlog (Recientemente creada)
    backlogStory = By.css('span[data-aid="StoryPreviewItem__title"]');
    
    // Botón de Start (para intentar iniciar la historia)
    startStoryButton = By.css('button[data-aid="StateButton"][data-destination-state="start"]');
    
    // Dropdown de puntos al presionar Start
    storyPointsDropdown = By.css('.dropdown_menu.search');
    
    // Opción de puntos Unestimated
    unestimatedOption = By.css('li[data-value="-1"] a');

    // Botón Collapse
    collapseButton = By.css('button[id^="story_close_"], button[title="Save & collapse"]'); 

    // Pestaña My Work
    myWorkTabActive = By.css('div[title="My work"][data-panel-visible="true"]');
    myWorkTabInactive = By.css('div[title="My work"][data-panel-visible="false"]');
    
    // Contador de My Work
    myWorkCounter = By.css('div.MuiListItemSecondaryAction-root.panel_counter');
}

module.exports = new StoriesPage();
