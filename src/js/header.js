//
function initHeader() {
  initDemoModal(); 
}

//PRUEBA MODAL
function initDemoModal() {
  const button = document.getElementById("demo-modal-btn");

  button.addEventListener("click", async () => {
    const ok = await openModal({
      type: "danger",
      title: "Confirmar eliminación",
      subtitle: "Acción irreversible",
      message: "¿Seguro que quieres eliminar {item} del catálogo? Esta acción no se puede deshacer.",
      item: "Omega",
      confirmText: "Eliminar",
    });

    if (ok) {
      console.log("✅ Ha confirmado: aquí iría el axios.delete(...)");
      
    } else {
      console.log("❌ Ha cancelado: no se borra nada");
    }
  });
}