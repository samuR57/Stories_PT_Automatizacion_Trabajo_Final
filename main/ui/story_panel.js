const { By } = require("selenium-webdriver");

class StoryPanel{
    // Campo de texto para ingresar el título de una nueva historia
    storyTitleTextField = By.css('.backlog.current_backlog form textarea');

    // Dropdown para seleccionar el tipo de historia (feature, bug, chore)
    storyTypeDropdown = By.css('.backlog.current_backlog div[class="dropdown story_type"]');

    // Opción de tipo de historia dentro del menú desplegable, reemplaza "{0}" con el tipo de historia correspondiente
    storyOptionInDropdown = By.css('div[class="dropdown_menu search"] a[class="item_{0} "]');

    // Etiqueta que muestra el tipo de historia seleccionado (por ejemplo, "feature", "bug")
    storyTypeSelectedLabel = By.css('.backlog.current_backlog a[class="selection item_{0}"] span');

    // Etiqueta que muestra el nombre del dueño de la historia
    ownerNameSelectedLabel = By.css('.backlog.current_backlog .story_owners .name');

    // Ícono "+" para añadir un dueño adicional a la historia
    ownerPlusIcon = By.css('.backlog.current_backlog .add_owner.selected');

    // Lista de propietarios que se pueden asignar
    ownerSelect = By.css('.lightbox.owner.add_owner .name');

    // Botón para guardar los cambios
    saveButton = By.css('.backlog.current_backlog .autosaves.button');

    // Selector auxiliar que se puede utilizar
    locatorAux = By.css('');

    // Campo de texto para añadir una nueva tarea dentro de una historia
    addTaskTextField = By.css('textarea[data-aid="new"][data-focus-id^="TaskEdit--new"]');

    // Botón para confirmar la adición de la tarea
    confirmAddTaskButton = By.css('button[data-aid="addTaskButton"]');

    // Dropdown para abrir el menú de etiquetas dentro de una historia
    labelDropdownInStory = By.css('a[data-aid="StoryLabelsMaker__arrow"]');

    // Selector para elegir una etiqueta dentro del dropdown de etiquetas
    labelInDropdown = By.css('div[data-aid^="LabelDropdownItem--"]');

    // Verificación de que la etiqueta se asignó correctamente a la historia
    assignedLabelInStoryPreview = By.css('span.labels.post a.std.label');
}

module.exports = new StoryPanel();