import { TareaBase } from './TareaBase.js';
import { DecoradorColor } from './DecoradorColor.js';
import { DecoradorRojo } from './DecoradorRojo.js';
import { DecoradorTachado } from './DecoradorTachado.js';
import { DecoradorPrioridadAlta } from './DecoradorProridadAlta.js';
import { DecoradorAplazado } from './DecoradorAplazado.js';
import { cargarTareas } from '../../storage/tareasStorage.js';

export function mostrarTareasDelDia(fechaISO){
  const listaTareas = document.getElementById('listaTareas');
  listaTareas.innerHTML = '';
  const tareas = cargarTareas();
  const tareasDelDia = tareas.filter(t=>t.fechaISO===fechaISO).sort((a,b)=>a.hora.localeCompare(b.hora));
  if (!tareasDelDia.length) { listaTareas.textContent = 'No hay tareas para este día.'; return; }
  for(const t of tareasDelDia){
    let componente = new TareaBase(t);

    if (t.decoradores && t.decoradores.color) componente = DecoradorColor(componente, t.decoradores.color);
    else if (t.decoradores && t.decoradores.rojo) componente = DecoradorRojo(componente); 
    if (t.decoradores && t.decoradores.tachado) componente = DecoradorTachado(componente);
    if (t.prioridad==='alta') componente = DecoradorPrioridadAlta(componente);
    if (t.decoradores && t.decoradores.aplazado) componente = DecoradorAplazado(componente);

    const nodo = componente.render();
    
    const acciones = nodo.querySelector('.acciones');
    const btnEditar = document.createElement('button'); 
    btnEditar.textContent='Editar';
    const btnBorrar = document.createElement('button'); 
    btnBorrar.textContent='Borrar';
    const btnRojo = document.createElement('button'); 
    btnRojo.textContent='Resaltar';
    const btnTachar = document.createElement('button'); 
    btnTachar.textContent='Tachar';
    const btnAplazar = document.createElement('button'); 
    btnAplazar.textContent='Aplazar';
    const btnPrior = document.createElement('button'); 
    btnPrior.textContent='Prioridad';
    acciones.appendChild(btnEditar); 
    acciones.appendChild(btnBorrar); 
    acciones.appendChild(btnRojo); 
    acciones.appendChild(btnTachar); 
    acciones.appendChild(btnAplazar); 
    acciones.appendChild(btnPrior);
    btnEditar.addEventListener('click', ()=>{ 
        if (typeof window.empezarEdicion === 'function') window.empezarEdicion(t.id); 
    });
    btnBorrar.addEventListener('click', ()=>{ 
        if (typeof window.borrarTarea === 'function') window.borrarTarea(t.id); 
    });
    btnRojo.addEventListener('click', ()=>{ 
        if (typeof window.ciclarColorEnTarea === 'function') window.ciclarColorEnTarea(t.id); 
    });
    btnTachar.addEventListener('click', ()=>{ 
        if (typeof window.toggleDecoradorEnTarea === 'function') window.toggleDecoradorEnTarea(t.id,'tachado'); 
    });
    btnAplazar.addEventListener('click', ()=>{ 
        if (typeof window.aplazarTarea === 'function') window.aplazarTarea(t.id,1); 
    });
    btnPrior.addEventListener('click', ()=>{ 
        if (typeof window.cambiarPrioridad === 'function') window.cambiarPrioridad(t.id); 
    });
    listaTareas.appendChild(nodo);
  }
}
