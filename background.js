//Creo la opción en el menu Contextual

chrome.contextMenus.create({
  id: "copiarSeguro",
  title: "Copiado seguro",
  //Especifico que también se ejecute en la selección
  contexts: ["selection", "page"],
});

//Si se dió click en la opción del menú derecho, entonces realizar la acción de copiado seguro
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "copiarSeguro") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      if (tab) {
        chrome.tabs.sendMessage(
          tab.id,
          { action: "copiarContenido", text: info.selectionText },
          function (response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              console.log(response);
            }
          }
        );
      } else {
        console.error("No se contró la pestaña activa.");
      }
    });
  }
});

//Evento de escucha para saber las opciones activas y así el content las ejecute

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getOptions") {
    chrome.storage.local.get(
      ["copiarWallet", "verificarHTTPS", "validarPhishing"],
      function (result) {
        sendResponse(result);
      }
    );
    return true;
  }
});
