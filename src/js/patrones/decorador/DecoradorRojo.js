export function DecoradorRojo(componente){
  return {
    render(){ 
        const n = componente.render(); 
        n.classList.add('rojo'); 
        return n; 
    }
  }
}