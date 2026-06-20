// Sistema de notificaciones toast reutilizable
// Se expone en window.toast y window.toastConfirm

(function () {
  // Crea el contenedor de toasts si no existe
  function ensureContainer() {
    let cont = document.getElementById('toast-container');
    if (!cont) {
      cont = document.createElement('div');
      cont.id = 'toast-container';
      document.body.appendChild(cont);
    }
    return cont;
  }

  // Tipos: 'success' (verde), 'error' (rojo), 'info' (azul), 'warning' (amarillo)
  const ICONS = {
    success: '✓',
    error: '✕',
    info: 'i',
    warning: '!',
  };

  function toast(message, type = 'info', duration = 3000) {
    const cont = ensureContainer();
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `
      <div class="toast-icon">${ICONS[type] || 'i'}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" type="button" aria-label="Cerrar">×</button>
    `;
    cont.appendChild(t);

    // Animar entrada
    requestAnimationFrame(() => t.classList.add('toast-show'));

    // Botón cerrar
    t.querySelector('.toast-close').addEventListener('click', () => remove(t));

    // Auto-cerrar
    const timer = setTimeout(() => remove(t), duration);
    t.addEventListener('click', () => {
      clearTimeout(timer);
      remove(t);
    });
  }

  function remove(t) {
    t.classList.remove('toast-show');
    t.classList.add('toast-hide');
    setTimeout(() => t.remove(), 300);
  }

  // Confirmación personalizada (reemplaza a window.confirm)
  function toastConfirm(message, onConfirm, onCancel) {
    const cont = ensureContainer();
    const t = document.createElement('div');
    t.className = 'toast toast-confirm';
    t.innerHTML = `
      <div class="toast-icon">?</div>
      <div class="toast-message">${message}</div>
      <div class="toast-actions">
        <button class="toast-btn toast-btn-cancel" type="button">Cancelar</button>
        <button class="toast-btn toast-btn-ok" type="button">Aceptar</button>
      </div>
    `;
    cont.appendChild(t);
    requestAnimationFrame(() => t.classList.add('toast-show'));

    const close = () => {
      t.classList.remove('toast-show');
      t.classList.add('toast-hide');
      setTimeout(() => t.remove(), 300);
    };

    t.querySelector('.toast-btn-ok').addEventListener('click', () => {
      close();
      if (onConfirm) onConfirm();
    });
    t.querySelector('.toast-btn-cancel').addEventListener('click', () => {
      close();
      if (onCancel) onCancel();
    });
  }

  // Exponer en window
  window.toast = toast;
  window.toastConfirm = toastConfirm;
})();
