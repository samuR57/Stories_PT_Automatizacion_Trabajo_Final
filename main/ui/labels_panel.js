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
}

module.exports = new LabelsPanel();