export class CeldaFlyweight {
  constructor() {
    
  }
  render(dia, fechaISO, tareasDelDia) {
    const celda = document.createElement('td');

    if (!dia) { 
        celda.classList.add('vacio'); 
        return celda; 
    }

    const numero = document.createElement('div'); 
    numero.className = 'numero'; 
    numero.textContent = dia;

    celda.appendChild(numero);
    
    if (tareasDelDia.length){
      const marcador = document.createElement('div'); 
      marcador.className='marcador';

      marcador.textContent = tareasDelDia.length + ' tarea' + (tareasDelDia.length>1?'s':'');

      celda.appendChild(marcador);
      
      const prioridades = tareasDelDia.map(t=>t.prioridad);

      if (prioridades.includes('alta')) celda.classList.add('prioridad-alta');
    }
    celda.dataset.fecha = fechaISO;
    return celda;
  }
}
