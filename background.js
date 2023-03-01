chrome.contextMenus.create({
    id: "copiarSeguro",
    title: "Copiado seguro",
    contexts: ["selection","page"]
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copiarSeguro") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
          chrome.tabs.sendMessage(tab.id, {action: "copiarContenido", text: info.selectionText}, function(response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              console.log(response);
            }
          });
        } else {
          console.error("No se pudo encontrar la pestaña activa.");
        }
      });
    }
  });
  