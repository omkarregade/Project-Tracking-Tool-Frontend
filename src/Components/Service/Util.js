
export function getId(){
    return localStorage.getItem("id");
}

export function isAuthenticated(){
    return localStorage.getItem("id") ? true:false;
}
export function logout(){
    localStorage.removeItem("id");
}
