import { FabricaCeldas } from './FabricaCeldas.js';
import { formatearYYYYMMDD, NOMBRES_MESES } from '../../utils/fecha.js';
import { cargarTareas } from '../../storage/tareasStorage.js';

const cuerpoCalendario = document.getElementById('cuerpoCalendario');
const mesAnyo = document.getElementById('mesAnyo');

export function construirCalendario(anyo, mes){
  
  const tareas = cargarTareas();
  const fabrica = new FabricaCeldas();

  cuerpoCalendario.innerHTML = '';
  mesAnyo.textContent = `${NOMBRES_MESES[mes]} ${anyo}`;
  const primerDia = new Date(anyo, mes, 1);
  const ultimoDia = new Date(anyo, mes+1, 0);
  const inicioSemana = (primerDia.getDay()+6)%7; // convertimos a Lun=0
  const diasMes = ultimoDia.getDate();

  let fila = document.createElement('tr');
  
  for(let i=0;i<inicioSemana;i++) fila.appendChild(fabrica.crear(null, '', []));

  for(let d=1; d<=diasMes; d++){
    const fecha = new Date(anyo, mes, d);
    const fechaISO = formatearYYYYMMDD(fecha);
    const tareasDelDia = tareas.filter(t=>t.fechaISO===fechaISO).sort((a,b)=>a.hora.localeCompare(b.hora));
    const celda = fabrica.crear(d, fechaISO, tareasDelDia);
    fila.appendChild(celda);
    if (fila.children.length===7){ cuerpoCalendario.appendChild(fila); fila = document.createElement('tr'); }
  }
  
  while(fila.children.length>0 && fila.children.length<7) fila.appendChild(fabrica.crear(null, '', []));
  if (fila.children.length) cuerpoCalendario.appendChild(fila);

  
  cuerpoCalendario.querySelectorAll('td').forEach(td=>{
    if (td.dataset.fecha){
      td.addEventListener('click', ()=>{
        
        if (typeof window.abrirPanel === 'function') window.abrirPanel(td.dataset.fecha);
        else window.dispatchEvent(new CustomEvent('abrirPanel', { detail: td.dataset.fecha }));
      });
    }
  });
}
