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
    
    // Historia en el Backlog
    backlogStory = By.css('span[data-aid="StoryPreviewItem__title"]');
    
    // Botón de Start
    startStoryButton = By.css('button[data-aid="StateButton"][data-destination-state="start"]');

    // Selector para el botón Finish
    finishButton = By.css('div.state.row > div > span > button[data-destination-state="finish"]');

    // Selector para el botón Deliver 
    deliverButton = By.css('div.state.row > div > span > button[data-destination-state="deliver"]');

    // Botón de Accept
    acceptButton = By.css('button.state.button.accept');

    // Cuadro de advertencia que aparece al intentar aceptar la historia bloqueada
    warningPopup = By.css('div[data-aid="ConfirmationDialog"]');

    // Botón de "Cancelar" en el cuadro de advertencia
    cancelButtonInWarning = By.css('button[data-aid="ConfirmationDialog__cancel"]');

    // Botón para añadir un bloqueador
    addBlockerButton = By.css('section.blockers.full > div > div');
    
    // Input para el motivo del bloqueador
    blockerInputField = By.css('textarea[data-aid="Blocker__textarea"]');

    // Botón para confirmar el bloqueador
    addBlockerConfirmButton = By.css('button[data-aid="BlockerEdit__addButton"]');

    // Botón para cancelar la adición de otro bloqueador
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
    storyToMove = By.css('span[data-aid="StoryPreviewItem__title"]');

    // Posición superior del backlog (para mover la historia)
    backlogTopPosition = By.css('div.tn-panel_loom div[title="Current/backlog"]');

    // Selector para el dropdown de estado de la historia (junto al botón Finish)
    storyStateDropdownButton = By.css('button[class*="StoryState__dropdownButton"]');

    // Selector para seleccionar la opcion unstarted despues de haber presionado en el boton start
    unstartedStoryStateOption = By.css('button[data-aid="Unstarted"]');

    // Dropdown de puntos al presionar Start
    storyPointsDropdown = By.css('a[id^="story_estimate_dropdown"]');

    // Opción de puntos 0
    pointsOption0 = By.css('li[data-value="0"] a[id^="0_story_estimate_dropdown"]');

    // Opción de puntos 3
    pointsOption3 = By.css('li[data-value="3"] a[id^="3_story_estimate_dropdown"]');

    // Enlace a la configuración "Iteration length in weeks"
    iterationLengthLink = By.css('time[class*="IterationMarker__length"]');

    // Input para la longitud de la iteración
    iterationLengthInput = By.css('input[data-aid="IterationLength__input"]');

    // Botón para aplicar la longitud de la iteración
    applyIterationLengthButton = By.css('button[data-aid="IterationLength__apply"]');

    // Selector para abrir la configuración de velocidad
    velocityButton = By.css('button[data-aid="VelocityIndicator"]');

    // Input para la simulación de velocidad
    velocityInput = By.css('input[id="velocity_overridden_velocity"]');

    // Botón para aplicar la velocidad
    applyVelocityButton = By.css('button.apply.submit[title="Apply"]');

    // Enlace de la fecha calculada para la entrega
    iterationDateLink = By.css('time[class*="IterationMarker__length"]');

    // Selector para el enlace de la última fecha calculada para la entrega (última en la lista)
    iterationDateLinkLast = By.css('header[data-id="3"] time[class*="IterationMarker__length"]');

    // Dropdown para las historias aceptadas (para mostrar/ocultar las historias aceptadas)
    acceptedStoriesDropdown = By.css('div[class*="accepted_stories_bar"]');

    // Título de la historia aceptada dentro del dropdown
    acceptedStoryTitle = By.css('span[data-aid="StoryPreviewItem__title"]');

    // Verificar la cantidad de historias aceptadas en el dropdown
    acceptedStoryCountLabel = By.css('label[class="hide"], label[class="show"]');

    // Botón de opciones (tres puntos) en el panel Current Iteration/Backlog
    optionsButton = By.css('button.MuiIconButton-root[title="Actions"]');

    // Opción para dividir Current Iteration y Backlog
    splitOption = By.css('li[data-aid="Split Current & Backlog"]');

    // Opción para combinar Current Iteration y Backlog
    combineOption = By.css('li[data-aid="Combine Current & Backlog"]');

    // Verificación de que el panel Current Iteration se ha separado
    currentIterationPanel = By.css('div[data-type="current"]');

    //Verificación de que el panel Backlog se ha separado
    backlogPanel = By.css('div[data-type="backlog"]');

}

module.exports = new StoriesPage();
