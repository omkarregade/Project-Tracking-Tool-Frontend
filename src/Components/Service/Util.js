export function getId() {
  return localStorage.getItem("id");
}

export function getRole() {
  return localStorage.getItem("role") || "";
}

export function isAuthenticated() {
  return localStorage.getItem("token") ? true : false;
}
export function logout() {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
}
