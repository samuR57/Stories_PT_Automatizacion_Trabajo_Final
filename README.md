# Proyecto Final de Automatización - Pivotal Tracker

## Descripción del Proyecto

Este proyecto tiene como objetivo automatizar las pruebas de regresión para la aplicación Pivotal Tracker, utilizando herramientas como Selenium WebDriver, Cucumber, y Node.js. La automatización abarca diferentes funcionalidades de la aplicación, como la creación, actualización y eliminación de proyectos, así como la gestión de historias.

## Instalación y Ejecución

### Prerrequisitos

- Node.js (versión recomendada: >= 14)
- npm (gestor de paquetes de Node.js)

### Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

### Ejecución de las Pruebas

Para ejecutar las pruebas de automatización, utiliza el siguiente comando:

```bash
npx cucumber-js --tags "@ui"
```

Este comando ejecutará todos los escenarios definidos en los archivos `.feature` utilizando Cucumber.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de los mismos (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
