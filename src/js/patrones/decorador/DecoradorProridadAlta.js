export function DecoradorPrioridadAlta(componente){
  return { 
    render(){ 
      const n = componente.render(); 
      n.classList.add('prioridad-alta'); 
      return n; 
    } 
  };
}
