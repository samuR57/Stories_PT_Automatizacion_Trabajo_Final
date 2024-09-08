const { By } = require("selenium-webdriver");

class Header{
    // Etiqueta que muestra el nombre del proyecto en el encabezado de la página
    projectNameLabel = By.css('header[data-aid="PageHeader"] span[class="raw_context_name"]');

    // Botón para acceder a la pestaña de miembros del proyecto
    membersButton = By.css('a[data-aid="navTab-members"]');
}

module.exports = new Header();