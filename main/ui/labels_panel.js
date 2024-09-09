const { By } = require("selenium-webdriver");

class LabelsPanel {
    // Selector para el botón "Add Label"
    addLabelButton = By.css('div[id^="panel_labels"] button');

    // Selector para el cuadro de texto donde se ingresa el nombre de la etiqueta
    labelNameInput = By.css('input[data-aid="SmartListInput"]');

    // Selector para el botón "Add" que confirma la creación de la etiqueta
    confirmAddButton = By.css('button[data-aid="AddButton"]');

    // Selector para el panel donde se muestran las etiquetas creadas
    labelPanel = By.css('div.labelItem');

    // Selector para el nombre de la etiqueta
    labelName = By.css('div[data-aid="badge"] + div');

    //Selector para el dropdown que despliega opciones de la etiqueta
    labelDropdown = By.css('div[data-aid="DropdownButton"]');

    //Selector para la opción "Delete" dentro del dropdown
    deleteLabelOption = By.css('li[data-aid="Delete"]');

    //Selector para el botón "Delete" en el cuadro de diálogo de confirmación
    confirmDeleteButton = By.css('button[data-aid="ConfirmationDialog__confirm"]');

    //Selector para la opción "Rename" dentro del dropdown
    renameLabelOption = By.css('li[data-aid="Rename"]');

    //Selector para el campo de texto donde se renombra la etiqueta
    renameLabelInput = By.css('div[class^="RenameLabel__inputContainer"] input[class^="RenameLabel__input"]');

    //Selector para el botón "Apply" que confirma el renombrado
    applyRenameButton = By.xpath('//button[@data-aid="CancelButton" and text()="Apply"]');

}

module.exports = new LabelsPanel();