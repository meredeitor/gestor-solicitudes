// paths.js

const APP_FOLDERS = ["admin", "rh", "jefe", "guardia", "colaborador", "css", "js", "icons"];

export function appBasePath(){
  const segments = window.location.pathname.split("/").filter(Boolean);
  const appIndex = segments.findIndex(segment =>
    APP_FOLDERS.includes(segment) || segment.endsWith(".html")
  );

  if(appIndex <= 0){
    return "/";
  }

  return `/${segments.slice(0, appIndex).join("/")}/`;
}

export function appUrl(path = ""){
  const cleanPath = String(path).replace(/^\/+/, "");
  return new URL(cleanPath, window.location.origin + appBasePath()).pathname;
}

export function isCurrentPath(path = ""){
  return window.location.pathname === appUrl(path);
}