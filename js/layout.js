// layout.js

import { getSession, logout } from "./auth.js";
import { appUrl, isCurrentPath } from "./paths.js";

/* =========================
   ICONOS SVG
========================= */
/* =========================
   ICONOS SVG PRO
========================= */
const ICONS = {

  home: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 10l9-7 9 7"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  `,

  doc: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
      <path d="M14 2v6h6"/>
    </svg>
  `,

  users: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="7" r="4"/>
      <circle cx="17" cy="7" r="3"/>
      <path d="M2 21c0-4 4-7 9-7"/>
      <path d="M14 21c0-3 3-5 7-5"/>
    </svg>
  `,

  vacation: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="6" cy="19" r="2"/>
      <circle cx="18" cy="19" r="2"/>
      <path d="M2 17h20"/>
      <path d="M12 2v10"/>
      <path d="M9 5h6"/>
    </svg>
  `,

  clock: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  `,

  exit: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 17l5-5-5-5"/>
      <path d="M15 12H3"/>
    </svg>
  `,

  shield: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6z"/>
    </svg>
  `
};

/* =========================
   MENÚ POR ROL
========================= */
/* =========================
   MENÚ POR ROL
========================= */

const MENUS = {

  admin: [
    { text: "Dashboard", href: "admin/dashboard.html", icon: ICONS.home },
    { text: "Solicitudes", href: "rh/vacaciones.html", icon: ICONS.doc },
    { text: "Usuarios", href: "admin/usuarios.html", icon: ICONS.users },
    { text: "Empleados", href: "rh/empleados.html", icon: ICONS.users }
  ],

  rh: [
    { text: "Dashboard", href: "rh/dashboard.html", icon: ICONS.home },
    { text: "Solicitudes", href: "rh/vacaciones.html", icon: ICONS.doc },
    { text: "Empleados", href: "rh/empleados.html", icon: ICONS.users }
  ],

  jefe: [
    { text: "Dashboard", href: "jefe/dashboard.html", icon: ICONS.home },
    { text: "Vacaciones", href: "jefe/vacaciones.html", icon: ICONS.vacation },
    { text: "Permisos", href: "jefe/permisos.html", icon: ICONS.clock },
    { text: "Vales", href: "jefe/vales.html", icon: ICONS.exit },
    { text: "Aprobaciones", href: "jefe/solicitudes.html", icon: ICONS.doc }
  ],

  guardia: [
    { text: "Validaciones", href: "guardia/dashboard.html", icon: ICONS.shield }
  ],

  colaborador: [
    { text: "Inicio", href: "colaborador/dashboard.html", icon: ICONS.home },
    { text: "Vacaciones", href: "colaborador/vacaciones.html", icon: ICONS.vacation },
    { text: "Permisos", href: "colaborador/permisos.html", icon: ICONS.clock },
    { text: "Vales", href: "colaborador/vales.html", icon: ICONS.exit },
    { text: "Solicitudes", href: "colaborador/solicitudes.html", icon: ICONS.doc }
  ]

};

/* =========================
   INIT LAYOUT
========================= */
export function initLayout({ title = "" } = {}) {

  const session = getSession();

  if (!session) {
    window.location.replace(appUrl("login.html"));
    return;
  }

  document.body.innerHTML = `
  <div class="app-container">

    <header class="topbar">
      <div class="left">
        <strong>Gestor de Solicitudes</strong>
        <span>${title}</span>
      </div>

      <div class="right">
        <span>${session.nombre}</span>
        <button id="btnLogout">Salir</button>
      </div>
    </header>

    <main id="app"></main>

    <nav class="bottom-menu">
      <div id="menu"></div>
    </nav>

  </div>
`;


  // ✅ logout
  document.getElementById("btnLogout").onclick = logout;

  // ✅ construir menú
  renderMenu(session.rol);

  if("serviceWorker" in navigator){

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(appUrl("sw.js"))
      .then(() => console.log("✅ SW registrado"))
      .catch(e => console.error("Error SW", e));
  });

 }

}

/* =========================
   MENU
========================= */
function renderMenu(rol){

  const menu = document.getElementById("menu");

  (MENUS[rol] || []).forEach(item => {

    const btn = document.createElement("button");

    btn.className = "menu-item";

    btn.innerHTML = `
      ${item.icon}
      <span>${item.text}</span>
    `;

    if(isActive(item.href)){
      btn.classList.add("active");
    }

    btn.onclick = () => {
      window.location.href = appUrl(item.href);
    };

    menu.appendChild(btn);
  });
}

/* =========================
   ACTIVE LINK
========================= */
function isActive(href){
  return isCurrentPath(href);
}

/* =========================
   ESCAPE HTML
========================= */
function escapeHtml(text = ""){
  return String(text).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}