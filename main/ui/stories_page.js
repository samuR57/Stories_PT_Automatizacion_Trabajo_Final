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

    // Selector para el botón Finish (generalizado)
    finishButton = By.css('div.state.row > div > span > button[data-destination-state="finish"]');

    // Selector para el botón Deliver (generalizado)
    deliverButton = By.css('div.state.row > div > span > button[data-destination-state="deliver"]');

    // Botón de Accept (para aceptar la historia) (generalizado)
    acceptButton = By.css('button.state.button.accept');

    // Cuadro de advertencia que aparece al intentar aceptar la historia bloqueada
    warningPopup = By.css('div[data-aid="ConfirmationDialog"]');

    // Botón de "Cancelar" en el cuadro de advertencia (generalizado)
    cancelButtonInWarning = By.css('button[data-aid="ConfirmationDialog__cancel"]');

    // Botón para añadir un bloqueador (generalizado)
    addBlockerButton = By.css('section.blockers.full > div > div');
    
    // Input para el motivo del bloqueador (generalizado)
    blockerInputField = By.css('textarea[data-aid="Blocker__textarea"]');

    // Botón para confirmar el bloqueador (generalizado)
    addBlockerConfirmButton = By.css('button[data-aid="BlockerEdit__addButton"]');

    // Botón para cancelar la adición de otro bloqueador (generalizado)
    cancelBlockerButton = By.css('button[class*="BlockerEdit__cancel"]');
    
    // Dropdown de puntos al presionar Start
    storyPointsDropdown = By.css('.dropdown_menu.search');
    
    // Opción de puntos Unestimated
    unestimatedOption = By.css('li[data-value="-1"] a');

    // Opción de puntos desde 0 hasta 3
    pointsOption0 = By.css('li[data-value="0"] a');
    pointsOption1 = By.css('li[data-value="1"] a');
    pointsOption2 = By.css('li[data-value="2"] a');
    pointsOption3 = By.css('li[data-value="3"] a');

    // Botón Collapse
    collapseButton = By.css('button[id^="story_close_"], button[title="Save & collapse"]'); 

    // Pestaña My Work
    myWorkTabActive = By.css('div[title="My work"][data-panel-visible="true"]');
    myWorkTabInactive = By.css('div[title="My work"][data-panel-visible="false"]');
    
    // Contador de My Work
    myWorkCounter = By.css('div.MuiListItemSecondaryAction-root.panel_counter');

    // Selector actualizado para las historias en el backlog
    storyToMove = By.css('span[data-aid="StoryPreviewItem__title"]');  // Seleccionamos los títulos de las historias visibles

    // Posición superior del backlog (para mover la historia)
    backlogTopPosition = By.css('div.tn-panel_loom div[title="Current/backlog"]');
}

module.exports = new StoriesPage();
