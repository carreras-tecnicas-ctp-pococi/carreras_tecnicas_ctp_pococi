// js/main.js
function compartir() {
  var btn = document.getElementById('share-btn');
  var msg = document.getElementById('share-msg');

  if (!btn || !msg) return;

  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Mirá esta carrera técnica del CTP Pococí',
      url: window.location.href,
    }).catch(function () {
      // El usuario canceló — no hacer nada
    });
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href).then(function () {
      msg.textContent = '¡Enlace copiado!';
      btn.disabled = true;
      setTimeout(function () {
        msg.textContent = '';
        btn.disabled = false;
      }, 2000);
    }).catch(function () {
      msg.textContent = 'Copiá este enlace: ' + window.location.href;
    });
  } else {
    msg.textContent = 'Copiá este enlace: ' + window.location.href;
  }
}
