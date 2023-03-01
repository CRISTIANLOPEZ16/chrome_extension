// Espera a que se cargue la página completamente
window.addEventListener('load', function() {
  // Intenta comunicar con el script de fondo
  chrome.runtime.sendMessage({ message: 'Hola, mundo!' }, function(response) {
    console.log('Respuesta recibida:', response);
  });
});
