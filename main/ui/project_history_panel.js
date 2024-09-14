const { By } = require('selenium-webdriver');

class ProjectHistoryPanel {

    // Selector para los registros de cambios dentro del panel "Project History"
    changeRecordEntries = By.css('div.item.activity_entry');

    // Selector para el título dentro de cada registro de cambio
    changeRecordTitle = By.css('header.group h1');

    // Selector para la descripción del cambio realizado
    changeRecordDescription = By.css('div.message.tracker_markup p');

    // Selector para expandir los detalles de un cambio específico
    changeRecordExpander = By.css('a.details_expander');

    // Selector para la fecha y hora en que se realizó el cambio
    changeRecordTimestamp = By.css('span.time_ago');
}

module.exports = new ProjectHistoryPanel();
