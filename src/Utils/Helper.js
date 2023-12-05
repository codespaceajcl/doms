export function getToken() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth?.token;
}

export function getCurrentUser() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth;
}