## Tabla de contenido

- [SPF Security](#spf-security)
  - [Installation](#installation)
  - [Características](#características)
  - [Screenshots](#screenshots)
  - [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)

# SPF Security

Extensión para navegadores basados en Chromium con la cual se advierte al usuario de los riesgos de seguridad a la hora de realizar transacciones, especialmente de cryptoactivos, las cuales se realizan a través de wallets alfanuméricas. Debido a su complejidad de lectura y escritura, la gente suele copiar y pegar sin enfocarse mucho en si la wallet está correcta o no. Aprovechandose de esto, los hackers han desarrollado virus capaces de modificar el portapapeles del dispositivo y robar así dinero a las personas ingenuas, esta extensión advierte cuando el virus entra en acción y promueve medidas para erradicar el mismo.

Esta desarrollada en Js, Css y Html, haciendo uso de scripts que se ejecutan en background siempre a la escucha de cualquier evento y scripts de contenido los cuales son los que realizan las funciones necesarias para los distintos procesos de verificación que tiene la extensión.


![Logo](https://i.ibb.co/sjrw6Dz/icono.png)


## Installation

Para instalar la extensión siga los siguientes pasos:

1. Clona este repositorio para que tengas la extensión en una carpeta.
2. Abre Google Chrome o cualquier otro navegador basado en Chromium y haz clic en el botón de tres puntos en la esquina superior derecha de la ventana del navegador.
3. Selecciona "Más herramientas" y luego "Extensiones" en el menú desplegable.
4. En la página de extensiones, activa la opción de "Modo de desarrollador" en la esquina superior derecha de la pantalla.
5. Haz clic en el botón "Cargar descomprimida" en la esquina superior izquierda de la pantalla.
6. Busca la ubicación donde has guardado la extensión y haz clic en "Seleccionar carpeta" para cargar la extensión en Chrome.
7. La extensión debería aparecer en la lista de extensiones en la página de extensiones de Chrome y estar lista para usar.
    
## Características

* Notifica al usuario cuando copia una wallet de crypto.
* Advierte cuando la wallet que pega no es la misma que ha copiado previamente, e indica una serie de consejos para eliminar el problema.
* Notifica cuando el usuario navega en una página web sin certificado de seguridad.
* Advierte al usuario de posible phishing bancario al detectar páginas web bancarias clonadas.
## Screenshots

![App Screenshot](https://i.ibb.co/m9TgpXv/image.png)
![App Screenshot](https://i.ibb.co/PCYPDXG/image.png)
![App Screenshot](https://i.ibb.co/jrZXw2D/image.png)
## Documentation

[Documentation](https://linktodocumentation)

### Casos de Uso

Acciones realizadas por el usuario con la extensión SPF_SECURITY.

#### Caso de Uso General

<a href="https://ibb.co/726CCdN"><img src="https://i.ibb.co/ChT883s/Whats-App-Image-2023-03-07-at-11-13-59-AM.jpg" alt="Whats-App-Image-2023-03-07-at-11-13-59-AM" border="0"></a>

#### Caso de Uso Copiar URL

<a href="https://ibb.co/mcwTpC6"><img src="https://i.ibb.co/VqZ96W2/Whats-App-Image-2023-03-07-at-11-45-46-AM.jpg" alt="Whats-App-Image-2023-03-07-at-11-45-46-AM" border="0"></a><br />

### Fragmento de Código de la Extensión

Fragmento de código con el cual se valida si se copia una wallet para asegurarla.

Content

```bash
    document.addEventListener("copy", function (event) {
      if (copiarWallet) {
        // Obtener lo seleccionado y copiado

        var selectedText = window.getSelection().toString();

        // Setear el contenido del portapapeles
        event.clipboardData.setData("text/plain", selectedText);

        navigator.clipboard.writeText(selectedText).then(function () {
          if (/^0x[a-fA-F0-9]{40}$/g.test(selectedText)) {
            const alertDiv = document.createElement("div");
            alertDiv.textContent =
              "ℹ️ 🔒 Se ha copiado una Wallet: " + selectedText;
            alertDiv.style.cssText =
              "position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #4CAF50; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;";
            document.body.appendChild(alertDiv);
            setTimeout(function () {
              alertDiv.remove();
            }, 4000);
          }
        });
      }
      event.preventDefault();
    });
```

## Acknowledgements
- [MalwareBytes](https://es.malwarebytes.com/)
 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
