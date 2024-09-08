const { By } = require("selenium-webdriver");

class StoriesTab{
    // Botón para agregar una nueva historia dentro del backlog actual
    addStoryButton = By.css('.backlog.current_backlog button[title="Add Story"]');

    // Vista previa del contenido de la historia
    previewStoryItemRow = By.css('.backlog div[data-aid="StoryPreviewItem"] span[class="tracker_markup"]');

    // Botón para eliminar una historia específica
    deleteStoryButton = By.css('button.autosaves.delete[title="Delete this story"]');

    // Botón de confirmación para eliminar una historia
    confirmDeleteButton = By.css('button.SMkCk__Button.SSqkh__Button--warning[data-aid="DeleteButton"]');

    // Texto que indica que el backlog está vacío
    emptyMessageText = By.css('span.empty_message_text');

    // Etiqueta que muestra el nombre del proyecto
    projectNameLabel = By.css('.raw_context_name');

    // Título de la ventana emergente de alerta
    titleAlertDialogLabel = By.css('div[data-aid="AlertDialog__title"]');
}

module.exports = new StoriesTab();