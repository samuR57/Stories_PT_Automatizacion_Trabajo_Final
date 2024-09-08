const { By } = require("selenium-webdriver");

class IntroductionPage{
    // Botón que inicia el proceso de creación de un nuevo proyecto
    createProjectButton = By.css('.wizard .button');

    // Campo de entrada donde se ingresa el nombre del primer proyecto
    nameFirstProjectInput = By.css('.wizard input');
}

module.exports = new IntroductionPage();