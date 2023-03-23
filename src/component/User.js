export default class User{
    Username = "";
    LoginStatus = false;
    setUsername(Username) {
        this.Username = Username;
    }
    setLoginStatus(Status){
        this.LoginStatus = Status;
    }
    getUsername(){
        return this.Username;
    }
    getStatus(){
        return this.LoginStatus;
    }
}