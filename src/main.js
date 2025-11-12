
import * as Fecha from './js/utils/fecha.js';
const { NOMBRES_DIAS, formatearYYYYMMDD, formatearDDMMYYYYDesdeISO } = Fecha;
import Tarea from './js/model/tarea.js';
import { cargarTareas, guardarTareas } from './js/storage/tareasStorage.js';
import { construirCalendario } from './js/patrones/flyweight/ConstruirCalendario.js';
import { mostrarTareasDelDia } from './js/patrones/decorador/mostrarTareasDelDia.js';


const diasSemana = document.getElementById('diasSemana');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const panel = document.getElementById('panel');
const fechaSeleccionada = document.getElementById('fechaSeleccionada');
const formTarea = document.getElementById('formTarea');
const formTitulo = document.getElementById('titulo');
const formDescripcion = document.getElementById('descripcion');
const formHora = document.getElementById('hora');
const formPrioridad = document.getElementById('prioridad');
const formCancelar = document.getElementById('cancelar');
const formTituloEncabezado = document.getElementById('formTitulo');
const btnResaltarGlobal = document.getElementById('btnResaltar');
const btnTacharGlobal = document.getElementById('btnTachar');
const btnAplazarGlobal = document.getElementById('btnAplazar');
const btnPrioridadAltaGlobal = document.getElementById('btnPrioridadAlta');

// estado
let tareas = cargarTareas();
let fechaActual = new Date();
let estadoEdicion = null; 


function inicializarDiasSemana(){
  diasSemana.innerHTML = '';
  for(const d of NOMBRES_DIAS){
    const th = document.createElement('th'); 
    th.textContent = d; 
    diasSemana.appendChild(th);
  }
}

function abrirPanel(fechaISO){
  panel.classList.remove('oculto'); panel.setAttribute('aria-hidden','false');
  fechaSeleccionada.textContent = formatearDDMMYYYYDesdeISO(fechaISO);
  formTarea.reset(); estadoEdicion = null; 
  formTituloEncabezado.textContent='Crear tarea';
  mostrarTareasDelDia(fechaISO);
  panel.dataset.fecha = fechaISO;
}

function cerrarPanel(){ 
  panel.classList.add('oculto'); 
  panel.setAttribute('aria-hidden','true'); 
}


window.abrirPanel = abrirPanel;


function toggleDecoradorEnTarea(id, clave){
  const t = tareas.find(x=>x.id===id); if(!t) return;
  if (!t.decoradores) t.decoradores = { rojo:false, tachado:false, aplazado:false };
  t.decoradores[clave] = !Boolean(t.decoradores[clave]);
  guardarTareas(tareas); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
  mostrarTareasDelDia(panel.dataset.fecha);
}


const PALETA_RESALTADO = [null, '#ffdede', '#fff3bf', '#e6f7ff', '#e6ffe6'];
function ciclarColorEnTarea(id){
  const t = tareas.find(x=>x.id===id); 
  if(!t) return;
  if (!t.decoradores) t.decoradores = { color: null, rojo:false, tachado:false, aplazado:false };
  const actual = t.decoradores.color || null;
  const idx = PALETA_RESALTADO.indexOf(actual);
  const siguiente = PALETA_RESALTADO[(idx+1) % PALETA_RESALTADO.length];
  t.decoradores.color = siguiente;
  
  if (siguiente) t.decoradores.rojo = false;
  guardarTareas(tareas); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
  mostrarTareasDelDia(panel.dataset.fecha);
}

function aplazarTarea(id, dias){
  const t = tareas.find(x=>x.id===id); 
  if(!t) return;
  const fecha = new Date(t.fechaISO + 'T00:00:00'); 
  fecha.setDate(fecha.getDate()+dias);
  t.fechaISO = formatearYYYYMMDD(fecha);
  guardarTareas(tareas); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
  mostrarTareasDelDia(panel.dataset.fecha);
}

function cambiarPrioridad(id){
  const t = tareas.find(x=>x.id===id); 
  if(!t) return;
  const orden = ['baja','media','alta'];
  const idx = orden.indexOf(t.prioridad); 
  t.prioridad = orden[(idx+1)%orden.length];
  guardarTareas(tareas); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
  mostrarTareasDelDia(panel.dataset.fecha);
}


btnResaltarGlobal.addEventListener('click', ()=>{ 
  if(!estadoEdicion){ 
    alert('Seleccione o cree una tarea para aplicar el decorador.'); 
    return;
  } 
  ciclarColorEnTarea(estadoEdicion);
});
btnTacharGlobal.addEventListener('click', ()=>{ 
  if(!estadoEdicion){ 
    alert('Seleccione o cree una tarea para aplicar el decorador.'); 
    return;
  } toggleDecoradorEnTarea(estadoEdicion,'tachado');
});
btnAplazarGlobal.addEventListener('click', ()=>{ 
  if(!estadoEdicion){ 
    alert('Seleccione o cree una tarea para aplicar el decorador.'); 
    return;
  } aplazarTarea(estadoEdicion,1); 
});
btnPrioridadAltaGlobal.addEventListener('click', ()=>{ 
  if(!estadoEdicion){ 
    alert('Seleccione o cree una tarea para aplicar el decorador.'); 
    return;
  }
  cambiarPrioridad(estadoEdicion);
});

function empezarEdicion(id){
  const t = tareas.find(x=>x.id===id); 
  if(!t) return;
  estadoEdicion = id; 
  formTituloEncabezado.textContent='Editar tarea';
  formTitulo.value = t.titulo; 
  formDescripcion.value = t.descripcion; 
  formHora.value = t.hora; 
  formPrioridad.value = t.prioridad;
}

function borrarTarea(id){
  if (!confirm('¿Borrar esta tarea?')) return;
  tareas = tareas.filter(t=>t.id!==id); 
  guardarTareas(tareas); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
  mostrarTareasDelDia(panel.dataset.fecha);
}


window.empezarEdicion = empezarEdicion;
window.borrarTarea = borrarTarea;
window.ciclarColorEnTarea = ciclarColorEnTarea;
window.toggleDecoradorEnTarea = toggleDecoradorEnTarea;
window.aplazarTarea = aplazarTarea;
window.cambiarPrioridad = cambiarPrioridad;

formTarea.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fechaISO = panel.dataset.fecha;
  if (!fechaISO) return;
  
  const valorTitulo = (formTitulo.value || '').trim();
  const valorHora = (formHora.value || '').trim();
  if (!valorTitulo || !valorHora) {
    
    if (!valorTitulo) { 
      alert('El título es obligatorio.'); 
      formTitulo.focus(); 
    }
    else { 
      alert('La hora es obligatoria.'); 
      formHora.focus(); 
    }
    return;
  }
  if (estadoEdicion){
    
    const t = tareas.find(x=>x.id===estadoEdicion);
    t.titulo = formTitulo.value; 
    t.descripcion = formDescripcion.value; 
    t.hora = formHora.value; 
    t.prioridad = formPrioridad.value;
  } else {
    const id = Date.now().toString(36);
    const nueva = new Tarea(id, formTitulo.value, formDescripcion.value, formPrioridad.value, fechaISO, formHora.value);
    tareas.push(nueva);
  }
  guardarTareas(tareas);
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth());
  mostrarTareasDelDia(fechaISO);
  
  formTarea.reset();
  estadoEdicion = null;
  formTituloEncabezado.textContent = 'Crear tarea';
  
  formTitulo.focus();
});

formCancelar.addEventListener('click', (e)=>{ e.preventDefault(); cerrarPanel(); });

btnAnterior.addEventListener('click', ()=>{ 
  fechaActual.setMonth(fechaActual.getMonth()-1); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
});
btnSiguiente.addEventListener('click', ()=>{ 
  fechaActual.setMonth(fechaActual.getMonth()+1); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth()); 
});


inicializarDiasSemana(); 
construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth());


window._tareas = tareas; window._recargar = ()=>{
  tareas = cargarTareas(); 
  construirCalendario(fechaActual.getFullYear(), fechaActual.getMonth());;
};
