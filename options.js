// Obtengo todos los elementos checkbox y el boton de guardar
const copiarWalletCheckbox = document.getElementById("copiarWalletCheckbox");
const httpsCheckbox = document.getElementById("httpsCheckbox");
const phishingCheckbox = document.getElementById("phishingCheckbox");
const saveButton = document.getElementById("guardar");

// Obtener el valor de las opciones desde el chrome storage
chrome.storage.local.get(
  ["copiarWallet", "verificarHTTPS", "validarPhishing"],
  function (result) {
    copiarWalletCheckbox.checked = result.copiarWallet || false;
    httpsCheckbox.checked = result.verificarHTTPS || false;
    phishingCheckbox.checked = result.validarPhishing || false;
  }
);

saveButton.addEventListener("click", function () {
  const copiarWallet = copiarWalletCheckbox.checked;
  const verificarHTTPS = httpsCheckbox.checked;
  const validarPhishing = phishingCheckbox.checked;

  // Guardar las opciones en elchrome storage
  chrome.storage.local.set(
    { copiarWallet, verificarHTTPS, validarPhishing },
    function () {}
  );
});
