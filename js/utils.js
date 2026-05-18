/* =========================
   CALCULAR ANTIGÜEDAD
========================= */
export function calcularAntiguedad(fechaIngreso){

  const inicio = new Date(fechaIngreso);
  const hoy = new Date();

  let años = hoy.getFullYear() - inicio.getFullYear();

  const m = hoy.getMonth() - inicio.getMonth();

  if(m < 0 || (m === 0 && hoy.getDate() < inicio.getDate())){
    años--;
  }

  return años;
}

/* =========================
   DÍAS SEGÚN LFT
========================= */
export function diasPorLey(años){

  if(años < 1) return 0;
  if(años === 1) return 12;
  if(años === 2) return 14;
  if(años === 3) return 16;
  if(años === 4) return 18;
  if(años === 5) return 20;

  return 20 + Math.floor((años - 5) / 5) * 2;
}

export function diasUsados(solicitudes, empleadoId){

  return solicitudes
    .filter(s =>
      s.tipo === "vacaciones" &&
      s.estado === "aprobado" &&
      s.empleadoId === empleadoId
    )
    .reduce((total, s) => total + (s.totalDias || 0), 0);
}

export function calcularSaldo(empleado, solicitudes){

  const años = calcularAntiguedad(empleado.fechaIngreso);

  const disponibles = diasPorLey(años);

  const usados = diasUsados(solicitudes, empleado.id);

  const restantes = disponibles - usados;

  return {
    años,
    disponibles,
    usados,
    restantes
  };
}
