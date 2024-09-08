const { By } = require("selenium-webdriver");

class LoginPage{
    // Campo de entrada para ingresar el nombre de usuario en el formulario de inicio de sesión
    usernameInput = By.css('form #credentials_username');

    // Campo de entrada para ingresar la contraseña en el formulario de inicio de sesión
    passwordInput = By.css('form #credentials_password');

    // Botón "Next" que se presiona después de ingresar el nombre de usuario en el formulario
    nextButton = By.css('form .app_signin_action_button');

    // Botón "Login" que se presiona después de ingresar la contraseña para completar el inicio de sesión
    loginButton = By.css('form label ~ .app_signin_action_button');

    // Botón para cerrar el banner de cookies que aparece en la página
    cookiesButton = By.css('div .banner-close-btn-container button');
}

module.exports = new LoginPage();