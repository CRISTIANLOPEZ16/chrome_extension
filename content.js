var walletCopiada;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "copiarContenido") {
    navigator.clipboard.writeText(request.text).then(function() {
      if (/^0x[a-fA-F0-9]{40}$/g.test(request.text)) {
        alertDiv.textContent = "Se ha copiado una Wallet: " + selectedText;
        alertDiv.style.cssText = 'position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #4CAF50; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;';
        document.body.appendChild(alertDiv);
        setTimeout(function() {
          alertDiv.remove();
        }, 4000);
        walletCopiada = request.text;
      } else {
        console.log("El contenido del portapapeles no es una dirección de Ethereum");
      }
      
    });
  }
});

var walletHacker = "0x5a82ae142b2e62cb7d10b55e323acb1cab663a78";

document.addEventListener('paste', function(event) {
  var clipboardData = event.clipboardData || window.clipboardData;
  var pastedData = clipboardData.getData('text');
  
  // Verificar si el contenido del portapapeles es una dirección Ethereum
  var ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (ethereumAddressRegex.test(pastedData)) {
    if(pastedData!=walletCopiada){
      const alertDiv = document.createElement('div');
      alertDiv.textContent = "¡Cuidado! La dirección que acabas de pegar "+walletHacker +" no es la misma que copiaste: " + pastedData;
      alertDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f44336; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;';
      document.body.appendChild(alertDiv);
      setTimeout(function() {
        alertDiv.remove();
      }, 8000);

      // alert("¡Cuidado! La dirección que acabas de pegar no es la misma que copiaste " + walletHacker);
    }
  }
});


document.addEventListener('copy', function(event) {
  // Obtener lo seleccionado y copiado
  var selectedText = window.getSelection().toString();
  
  // Modificar el contenido del portapapeles
  event.clipboardData.setData('text/plain', selectedText);

  navigator.clipboard.writeText(selectedText).then(function() {
    if (/^0x[a-fA-F0-9]{40}$/g.test(selectedText)) {
      const alertDiv = document.createElement('div');
      alertDiv.textContent = "Se ha copiado una Wallet: " + selectedText;
      alertDiv.style.cssText = 'position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #4CAF50; color: white; font-size: 20px; font-weight: bold; text-align: center; border-radius: 10px; z-index: 9999;';
      document.body.appendChild(alertDiv);
      setTimeout(function() {
        alertDiv.remove();
      }, 4000);
    } else {
      console.log("El contenido del portapapeles no es una dirección de Ethereum");
    }
    
  });
  
  // Prevenir la acción por defecto de copiar
  event.preventDefault();
});





