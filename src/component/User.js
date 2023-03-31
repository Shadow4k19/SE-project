export default class User{
    Username = "";
    LoginStatus = false;
    constructor(){
        localStorage.getItem("username");
        localStorage.getItem("status");
    }
    setUsername(Username) {
        this.Username = Username;
        localStorage.setItem('username',this.Username);
    }
    setLoginStatus(Status){
        this.LoginStatus = Status;
        localStorage.setItem('status',this.Status);
    }
    getUsername(){
        return this.Username;
    }
    getStatus(){
        return this.LoginStatus;
    }
}