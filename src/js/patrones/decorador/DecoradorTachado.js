export function DecoradorTachado(componente){
  return { 
    render(){ 
        const n = componente.render(); 
        n.classList.add('tachado'); 
        return n; 
    } 
};
}