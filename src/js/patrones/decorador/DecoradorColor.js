export function DecoradorColor(componente, color){
  return {
    render(){ 
        const n = componente.render(); 
        n.style.backgroundColor = color; 
        n.style.borderColor = color ? color : ''; 
        return n; 
    }
  };
}