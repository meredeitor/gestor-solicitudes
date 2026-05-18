// firebase.js

// 🔥 Importar Firebase desde CDN (ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// ✅ Configuración de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyCy8UooqrTlW33a53Xy-r4A-jSdfwnZ0XQ",
  authDomain: "gestor-solicitudes-baca9.firebaseapp.com",
  projectId: "gestor-solicitudes-baca9",
  storageBucket: "gestor-solicitudes-baca9.firebasestorage.app",
  messagingSenderId: "902024429121",
  appId: "1:902024429121:web:c278e637aa585fd5b110c0"
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ✅ Inicializar Firestore
const db = getFirestore(app);

// ✅ Exportar para usar en toda la app
export { db };
