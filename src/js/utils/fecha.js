export const NOMBRES_DIAS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
export const NOMBRES_MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export function formatearYYYYMMDD(date){
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

export function formatearDDMMYYYYDesdeISO(iso){
  // iso espera YYYY-MM-DD
  if (!iso) return '';
  const partes = iso.split('-');
  if (partes.length!==3) return iso;
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

export default {
  NOMBRES_DIAS,
  NOMBRES_MESES,
  formatearYYYYMMDD,
  formatearDDMMYYYYDesdeISO
};