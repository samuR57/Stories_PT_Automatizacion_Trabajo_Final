const { By } = require('selenium-webdriver');

class EpicsPanel {
    
    // Botón para agregar un nuevo Epic
    addEpicButton = By.css('button[data-aid="AddButton"][title="Add Epic"]')

    // Campo de entrada para el título del Epic
    epicTitleInput = By.css('textarea[data-aid="name"][name="epic[name]"]')

    // Botón para guardar el Epic
    saveEpicButton = By.css('button[title="Save & collapse"][class*="save"]')

    // Verificación del título del Epic en la lista de Epics
    epicTitleInList = By.css('div[data-aid="EpicPreviewItem__title"] span.tracker_markup')

    // Botón para eliminar un Epic
    deleteEpicButton = By.css('button[title="Delete this epic"][class*="delete"]');

    // Botón de confirmación para eliminar un Epic
    confirmDeleteButton = By.css('button[data-aid="DeleteButton"]');

    // Selector Dropdown para abrir la lista de etiquetas disponibles en el Epic
    labelDropdownInEpic = By.css('a[data-aid="EpicLabelsMaker__arrow"]');

    // Para escoger las Opciones de etiquetas dentro del dropdown del Epic
    labelInDropdown = By.css('div[data-aid^="LabelDropdownItem--"]');

    //Verificación de la etiqueta asignada al Epic
    assignedLabelInEpic = By.css('div[class*="labelItem__name--epic"]');
}

module.exports = new EpicsPanel();