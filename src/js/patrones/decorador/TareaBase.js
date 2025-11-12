export class TareaBase {
  constructor(tarea){ this.tarea = tarea; }
  render() {
    const nodo = document.createElement('div');
    nodo.className = 'tarea';
    nodo.dataset.id = this.tarea.id;
    
    const texto = document.createElement('div');
    texto.innerHTML = `<strong>${this.tarea.titulo}</strong><div class="meta">${this.tarea.hora || ''} · ${this.tarea.prioridad}</div><div class="meta">${this.tarea.descripcion||''}</div>`;

    const acciones = document.createElement('div'); 
    acciones.className='acciones';
    nodo.appendChild(texto); 
    nodo.appendChild(acciones);
    return nodo;
  }
}