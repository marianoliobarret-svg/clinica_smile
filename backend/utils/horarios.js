function esDiaHabil(fecha) {
  const dia = new Date(fecha).getDay();
  // 0 = Domingo, 6 = Sábado
  return dia !== 0 && dia !== 6;
}

function esHorarioValido(hora) {
  const [h, m] = hora.split(":").map(Number);

  if (h < 9 || h > 17) return false;
  if (m !== 0 && m !== 30) return false;

  return true;
}

module.exports = { esDiaHabil, esHorarioValido };
