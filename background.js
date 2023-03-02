chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "copiarSeguro",
      title: "Copiar seguro",
      contexts: ["selection", "page"]
    });
  });
  chrome.commands.onCommand.addListener( async () => {
  });