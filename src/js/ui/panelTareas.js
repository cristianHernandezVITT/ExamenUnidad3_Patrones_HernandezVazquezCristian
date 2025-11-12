export function abrirPanel(fechaISO){
  panel.classList.remove('oculto'); panel.setAttribute('aria-hidden','false');
  fechaSeleccionada.textContent = formatearDDMMYYYYDesdeISO(fechaISO);
  formTarea.reset(); estadoEdicion = null; formTituloEncabezado.textContent='Crear tarea';
  mostrarTareasDelDia(fechaISO);
  panel.dataset.fecha = fechaISO;
}