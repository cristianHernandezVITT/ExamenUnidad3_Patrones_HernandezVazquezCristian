export default class Tarea {
  constructor(id, titulo, descripcion, prioridad, fechaISO, hora, decoradores) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.prioridad = prioridad; 
    this.fechaISO = fechaISO;
    this.hora = hora || '';
    this.decoradores = decoradores || { color: null, rojo: false, tachado: false, aplazado: false };
  }
}