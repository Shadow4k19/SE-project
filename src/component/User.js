export default class User {
    constructor() {
        localStorage.getItem("username");
        localStorage.getItem("status");
    }
    setUsername(Username) {
        localStorage.setItem('username', Username);
    }
    setLoginStatus(Status) {
        localStorage.setItem('status', Status);
        //console.log("set already");
    }
    getUsername() {
        return localStorage.getItem("username");
    }
    getStatus() {
        return localStorage.getItem("status");
    }
    deleteUser() {
        localStorage.removeItem('username');
        this.setLoginStatus(false);
        //console.log("already logout");
    }
}