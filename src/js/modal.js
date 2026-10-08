
// Componente modal de confirmación (reutilizable)
//
// Uso:
//   const ok = await openModal({
//     title: "Confirmar eliminación",
//     subtitle: "Acción irreversible",
//     message: "Se eliminará {item} del catálogo.",
//     item: "Omega",
//     confirmText: "Eliminar",
//   });
//   if (ok) { ...borrar... }



const MODAL_TYPES = {
  danger: { icon: "warning", confirmIcon: "delete" }, 
  primary: { icon: "help", confirmIcon: "check" }, 
  success: { icon: "check_circle", confirmIcon: "check" }, 
  info: { icon: "info", confirmIcon: "check" },
};

let modalResolve = null;


function openModal({
  title = "¿Estás seguro?",
  subtitle = "",
  message = "",
  item = "",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  type = "danger",
  showCancel = true,
} = {}) {
  const modal = document.getElementById("app-modal");
  const config = MODAL_TYPES[type] || MODAL_TYPES.danger;

  modal.dataset.type = type;
  document.getElementById("modal-icon").textContent = config.icon;
  document.getElementById("modal-confirm-icon").textContent = config.confirmIcon;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-subtitle").textContent = subtitle;
  document.getElementById("modal-confirm-text").textContent = confirmText;
  document.getElementById("modal-cancel-text").textContent = cancelText;
  setModalMessage(message, item);


  const cancelBtn = modal.querySelector('[data-action="cancel"]');
  cancelBtn.hidden = !showCancel;

  modal.showModal();
 
  const focusBtn = showCancel ? cancelBtn : modal.querySelector('[data-action="confirm"]');
  focusBtn.focus();

  return new Promise((resolve) => {
    modalResolve = resolve;
  });
}


function closeModal(result) {
  const modal = document.getElementById("app-modal");
  if (modal.open) modal.close();

  if (modalResolve) {
    modalResolve(result);
    modalResolve = null;
  }
}


function setModalMessage(message, item) {
  const el = document.getElementById("modal-message");
  el.textContent = "";

  const [before, after = ""] = message.split("{item}");
  el.append(before);

  if (message.includes("{item}")) {
    const strong = document.createElement("strong");
    strong.textContent = `"${item}"`;
    el.append(strong, after);
  }
}


function initModal() {
  const modal = document.getElementById("app-modal");

  modal.querySelector('[data-action="confirm"]').addEventListener("click", () => closeModal(true));
  modal.querySelector('[data-action="cancel"]').addEventListener("click", () => closeModal(false));

  // Tecla Escape
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal(false);
  });


  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(false);
  });
}

initModal();