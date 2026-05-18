// auth.js

import { db } from "./firebase.js";
import { appUrl } from "./paths.js";

import { collection, getDocs }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

/* =========================
   OBTENER USUARIOS
========================= */
export async function getUsuarios(){

  const snapshot = await getDocs(collection(db, "usuarios"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/* =========================
   LOGIN
========================= */
export async function login(email, password){

  const usuarios = await getUsuarios();

  // 🔐 buscar usuario
  const user = usuarios.find(u =>
    u.email === email
  );

  if(!user){
    throw new Error("Usuario no encontrado");
  }

  // ✅ validación activo
  if(!user.active){
    throw new Error("Usuario deshabilitado");
  }

  // ✅ (por ahora omitimos password en Firestore)
  // luego lo agregaremos

  // ✅ guardar sesión
  localStorage.setItem("session", JSON.stringify(user));

  return user;
}

/* =========================
   SESIÓN
========================= */
export function getSession(){
  return JSON.parse(localStorage.getItem("session"));
}

export function logout(){
  localStorage.removeItem("session");
  window.location.replace(appUrl("login.html"));
}