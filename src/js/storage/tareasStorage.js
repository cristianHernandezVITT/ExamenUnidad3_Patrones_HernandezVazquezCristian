import Tarea from '../model/tarea.js';

const CLAVE_STORAGE = 'tareas_v1';

export function cargarTareas() {
  const raw = localStorage.getItem(CLAVE_STORAGE);
  if (!raw) return [];
  try {
    const datos = JSON.parse(raw);
    return datos.map(obj => {
      let descripcion = obj.descripcion || '';
      let decoradores = { color: null, rojo: false, tachado: false, aplazado: false };
      if (obj.decoradores) {
        decoradores = Object.assign(decoradores, obj.decoradores);
      } else if (descripcion) {
        
        if (descripcion.includes('[rojo]')){ decoradores.rojo = true; 
            descripcion = descripcion.replace('[rojo]','').trim(); }
        if (descripcion.includes('[tachado]')){ decoradores.tachado = true; 
            descripcion = descripcion.replace('[tachado]','').trim(); }
        if (descripcion.includes('[aplazado]')){ decoradores.aplazado = true; 
            descripcion = descripcion.replace('[aplazado]','').trim(); }
      }
      return new Tarea(obj.id, obj.titulo, descripcion, obj.prioridad, obj.fechaISO, obj.hora, decoradores);
    });
  }
  catch(e){ console.error('Error parseando tareas', e); return []; }
}

export function guardarTareas(tareas){ 
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));            
}
