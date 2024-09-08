const { By } = require("selenium-webdriver");

class MembersTab{
    // Botón para invitar a nuevas personas al proyecto
    invitePeopleButton = By.css('#invite-people-button');

    // Campo de texto para buscar o ingresar el correo electrónico de la persona a invitar
    findEmailTextField = By.css('#invite-modal-search-bar');

    // Etiqueta que muestra el resultado de la búsqueda del miembro a invitar
    inviteMemberLabel = By.css('.MembershipList .InviteModal__SearchResultInner');

    // Botón para confirmar la invitación del nuevo miembro
    inviteButton = By.css('.Modal__footer .button.button--positive');
}

module.exports = new MembersTab();