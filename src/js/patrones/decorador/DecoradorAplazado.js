export function DecoradorAplazado(componente){
  return { 
    render(){ 
      const n = componente.render(); 
      n.classList.add('aplazado'); 
      return n; 
    } 
  };
}