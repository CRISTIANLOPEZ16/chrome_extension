//Defino la variable wallet copiada para almacenarla y comparar posteriormente.
var walletCopiada;

//Para practica, se simula el virus creando manualmente una wallet de hacker.
var walletHacker = "0x5a82ae142b2e62cb7d10b55e323acb1cab663a78";

const urlBancos = ["bancolombia", "davivienda", "bancodebogota"];

chrome.runtime.sendMessage({ action: "getOptions" }, function (response) {
  const copiarWallet = response.copiarWallet;
  const verificarHTTPS = response.verificarHTTPS;
  const validarPhishing = response.validarPhishing;

  // Ejecutar el código correspondiente dependiendo de las opciones seleccionadas
  if (copiarWallet) {
    //Copiado con evento de click en la opcion

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      //Valido si la acción en el contextMenu fue la de la extensión
      if (request.action == "copiarContenido") {
        //Accedo clipboard para agregar lo copiado
        navigator.clipboard.writeText(request.text).then(function () {
          //Verifico que lo copiado tenga el patrón de una wallet
          if (/^0x[a-fA-F0-9]{40}$/g.test(request.text)) {
            const alertDiv = document.createElement("div");
            alertDiv.textContent =
              "ℹ️ 🔒 Se ha copiado una Wallet: " + request.text;
            alertDiv.style.cssText =
              "position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #4CAF50; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;";
            document.body.appendChild(alertDiv);
            setTimeout(function () {
              alertDiv.remove();
            }, 4000);
            //La alerta de que la wallet fue copiada dura 4 segundos y luego se asigna a la variable.
            walletCopiada = request.text;
          }
        });
      }
    });

    //Copiado con evento de Control + C o Copy

    document.addEventListener("copy", function (event) {
      if (copiarWallet) {
        // Obtener lo seleccionado y copiado

        var selectedText = window.getSelection().toString();

        // Modificar el contenido del portapapeles
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
          } else {
            console.log(
              "El contenido del portapapeles no es una dirección de Ethereum"
            );
          }
        });
      }
      // Prevenir la acción por defecto de copiar
      event.preventDefault();
    });

    //Pegado

    document.addEventListener("paste", function (event) {
      var clipboardData = event.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("text");

      // Verificar si el contenido del portapapeles es una dirección Ethereum
      var ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (ethereumAddressRegex.test(pastedData)) {
        if (pastedData != walletCopiada) {
          const alertDiv = document.createElement("div");
          alertDiv.textContent =
            "⚠️¡Cuidado!⚠️ La dirección que acabas de pegar " +
            walletHacker +
            " no es la misma que copiaste: " +
            pastedData;
          alertDiv.style.cssText =
            "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f44336; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;";
          document.body.appendChild(alertDiv);
          setTimeout(function () {
            alertDiv.remove();
            window.open(chrome.runtime.getURL("consejos.html"));
          }, 3000);
          // alert("¡Cuidado! La dirección que acabas de pegar no es la misma que copiaste " + walletHacker);
        }
      }
    });
  }

  if (verificarHTTPS) {
    if (location.protocol !== "https:") {
      const alertDiv = document.createElement("div");
      alertDiv.textContent =
        "⚠️¡Cuidado!⚠️ La página web que acabas de acceder no cuenta con certificado de seguridad";
      alertDiv.style.cssText =
        "position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f44336; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;";
      document.body.appendChild(alertDiv);
      setTimeout(function () {
        alertDiv.remove();
      }, 3000);
    }
  }

  if (validarPhishing) {
    let currentUrl = window.location.href.toLowerCase();
    let domain;
    // currentUrl = "http://www.daviviendaa.com";
    // currentUrl = "http://www.bancolombiaa.com";
    let isValid = false;
    for (let i = 0; i < urlBancos.length; i++) {
      if (currentUrl.includes(urlBancos[i])) {
        domain = urlBancos[i] + ".com";
        isValid = true;
        break;
      }
    }
    if (isValid && currentUrl.includes(".com")) {
      if (domain !== currentUrl) {
        const alertDiv = document.createElement("div");
        alertDiv.textContent =
          "⚠️¡Cuidado!⚠️ La página web que acabas de acceder no parece ser la original, puede tratarse de un phishing, verifica que el dominio sea " +
          domain;
        alertDiv.style.cssText =
          "position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f44336; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;";
        document.body.appendChild(alertDiv);
        setTimeout(function () {
          alertDiv.remove();
        }, 8000);
      }
    }
  }
});
