const { By } = require("selenium-webdriver");

class ProjectSettingsPage{
    // Enlace que permite eliminar un proyecto
    deleteLink = By.css('a#delete_link');

    // Botón para confirmar la eliminación del proyecto
    deleteButton = By.css('#confirm_delete');

    // Botón para guardar los cambios en la configuración del proyecto
    saveButton = By.css('input.save_bar__submit');

    // Etiqueta que muestra el nombre actual del proyecto
    projectNameLabel = By.css('button .tc_header_project_name');
}

module.exports = new ProjectSettingsPage();