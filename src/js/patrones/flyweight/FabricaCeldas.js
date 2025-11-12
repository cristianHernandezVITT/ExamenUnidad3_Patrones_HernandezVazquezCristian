import { CeldaFlyweight } from './CeldaFlyweight.js';

export class FabricaCeldas {
  constructor(){ 
    this.fly = new CeldaFlyweight(); 
}
  crear(dia, fechaISO, tareasDelDia){ 
    return this.fly.render(dia, fechaISO, tareasDelDia); 
}
}
