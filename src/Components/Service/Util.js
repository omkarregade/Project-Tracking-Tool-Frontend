export function isAuthenticated(){
    return getId() ? true:false;
}
export function getId(){
    return localStorage.getId("id");
}
export function logout(){
    localStorage.removeItem("id");
}
