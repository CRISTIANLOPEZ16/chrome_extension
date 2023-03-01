chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "copiarSeguro",
      title: "Copiar seguro",
      contexts: ["selection", "page"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copiarSeguro") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getSelection"}, function(response) {
          if (response && response.selection) {
            const textToCopy = response.selection;
            navigator.clipboard.writeText(textToCopy).then(function() {
              console.log("¡Se ha copiado exitosamente!");
            }, function() {
                console.log("Ha ocurrido un error al intentar copiar el texto.");
            });
          } else {
            console.log("No se ha seleccionado ningún texto en esta pestaña.");
          }
        });
      });
    }
  });
  