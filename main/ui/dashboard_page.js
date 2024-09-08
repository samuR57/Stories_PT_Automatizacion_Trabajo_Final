const { By } = require("selenium-webdriver");

class DashboardPage{
     // Botón para crear un nuevo proyecto en el dashboard principal
     createProjectButton = By.css('#create-project-button');  

     // Campo de texto donde se ingresa el nombre del proyecto que se va a crear
     projectNameInput = By.css('form input[name="project_name"]');  
 
     // Selector de dropdown para elegir una cuenta (cuando un usuario tiene varias cuentas asociadas)
     selectorAccountDropdown = By.css('form .tc-account-selector__header');  
 
     // Opción dentro del dropdown que representa una cuenta específica para seleccionar
     optionOfDropdownSelector = By.css('form .tc-account-selector__option-account-name');  
 
     // Botón para confirmar la creación del proyecto después de ingresar el nombre y seleccionar la cuenta
     createButton = By.css('form button[type="submit"]');  
 
     // Selector auxiliar vacío que se puede utilizar en el futuro si se necesita agregar lógica dinámica o adicional
     locatorAux = By.css('');  
}

module.exports = new DashboardPage();