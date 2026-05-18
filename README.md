# Gestor de Solicitudes

Aplicacion web para gestionar solicitudes internas de vacaciones, permisos y vales de salida. El sistema separa las vistas por rol para que administradores, RH, jefes, guardias y colaboradores puedan trabajar con la informacion que les corresponde.

## Funcionalidades

- Inicio de sesion y registro de colaboradores.
- Paneles separados por rol.
- Gestion de usuarios para administrador.
- Gestion de empleados para RH.
- Solicitudes de vacaciones, permisos y vales.
- Flujo de aprobacion por jefe y RH.
- Validacion de salidas por guardia.
- Persistencia de datos con Firebase Firestore.
- Soporte basico PWA con `manifest.json` y `service worker`.
- Rutas compatibles con GitHub Pages.

## Roles disponibles

- **Administrador:** consulta metricas generales y administra usuarios.
- **RH:** revisa solicitudes, empleados y aprobaciones finales.
- **Jefe:** crea solicitudes para su equipo y aprueba solicitudes pendientes.
- **Guardia:** valida salidas aprobadas.
- **Colaborador:** crea y consulta sus propias solicitudes.

## Estructura del proyecto

```text
.
|-- admin/
|   |-- dashboard.html
|   `-- usuarios.html
|-- colaborador/
|   |-- dashboard.html
|   |-- permisos.html
|   |-- solicitudes.html
|   |-- vacaciones.html
|   `-- vales.html
|-- css/
|   `-- app.css
|-- guardia/
|   `-- dashboard.html
|-- icons/
|-- jefe/
|   |-- dashboard.html
|   |-- permisos.html
|   |-- solicitudes.html
|   |-- vacaciones.html
|   `-- vales.html
|-- js/
|   |-- auth.js
|   |-- firebase.js
|   |-- layout.js
|   |-- paths.js
|   |-- router.js
|   `-- utils.js
|-- rh/
|   |-- dashboard.html
|   |-- empleados.html
|   `-- vacaciones.html
|-- index.html
|-- login.html
|-- manifest.json
`-- sw.js
```

## Tecnologias

- HTML5
- CSS3
- JavaScript con modulos ES
- Firebase Firestore
- GitHub Pages
- PWA basica

## Configuracion de Firebase

La conexion con Firebase se encuentra en:

```text
js/firebase.js
```

Antes de publicar el proyecto, revisa que la configuracion de Firebase corresponda a tu proyecto real y que las reglas de Firestore permitan unicamente el acceso necesario.

> Nota: si este proyecto se usa en produccion, evita guardar contrasenas en texto plano dentro de Firestore. Lo recomendable es usar Firebase Authentication u otro sistema de autenticacion seguro.

## Como ejecutarlo localmente

Puedes abrir `index.html` directamente en el navegador, aunque para evitar problemas con modulos ES o service workers es recomendable servirlo con un servidor local.

Ejemplo con Python:

```bash
python -m http.server 5500
```

Luego abre:

```text
http://localhost:5500/
```

## Publicacion en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. En GitHub, entra a **Settings > Pages**.
3. En **Build and deployment**, selecciona la rama principal.
4. Selecciona la carpeta raiz del proyecto.
5. Guarda los cambios.
6. Abre la URL generada por GitHub Pages.

El proyecto incluye `js/paths.js` para que las rutas funcionen correctamente cuando GitHub Pages publique la app dentro de una subcarpeta, por ejemplo:

```text
https://usuario.github.io/gestor-solicitudes/
```

## Pagina de inicio

El archivo `index.html` debe conservarse. GitHub Pages lo usa como entrada principal del sitio y desde ahi se puede redirigir al login.

## Estado del proyecto

Proyecto en desarrollo para gestion interna de solicitudes.

## Autor

Desarrollado para uso interno de la empresa.
