// router.js

import { getSession } from "./auth.js";
import { appUrl } from "./paths.js";

/* =========================
   RUTAS POR ROL
========================= */
const rutas = {
  admin: "admin/dashboard.html",
  rh: "rh/dashboard.html",
  jefe: "jefe/dashboard.html",
  guardia: "guardia/dashboard.html",
  colaborador: "colaborador/dashboard.html"
};

/* =========================
   REDIRECCIÓN POST LOGIN
========================= */
export function goToDashboard(user){

  const ruta = rutas[user.rol];

  if(!ruta){
    alert("Rol no válido");
    return;
  }

  window.location.replace(appUrl(ruta));
}

/* =========================
   PROTEGER PÁGINAS
========================= */
export function protectRoute(rolesPermitidos = []){

  const session = getSession();

  // ❌ sin sesión
  if(!session){
    window.location.replace(appUrl("login.html"));
    return;
  }

  // ❌ rol no permitido
  if(rolesPermitidos.length && !rolesPermitidos.includes(session.rol)){
    alert("No tienes acceso a esta página");
    window.location.replace(appUrl("login.html"));
    return;
  }
}
