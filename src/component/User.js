class User {
    static instance = null;
  
    constructor() {
      if (User.instance) {
        throw new Error('Only one instance of User is allowed');
      }
  
      this.setUserFromStorage();
  
      User.instance = this;
    }
  
    setUserFromStorage() {
      this.setUsername(localStorage.getItem('username'));
      this.setLoginStatus(localStorage.getItem('status'));
      this.setUserrole(localStorage.getItem('userrole'));
      this.setUserid(localStorage.getItem('user_id'));
    }
  
    setUsername(username) {
      localStorage.setItem('username', username);
    }
  
    setLoginStatus(status) {
      localStorage.setItem('status', status);
    }
  
    setUserrole(userrole) {
      localStorage.setItem('userrole', userrole);
    }
  
    setUserid(userid) {
      localStorage.setItem('user_id', userid);
    }
  
    getUserrole() {
      return localStorage.getItem('userrole');
    }
  
    getUserid() {
      return localStorage.getItem('user_id');
    }
  
    getUsername() {
      return localStorage.getItem('username');
    }
  
    getStatus() {
      return localStorage.getItem('status');
    }
  
    deleteUser() {
      localStorage.removeItem('username');
      this.setLoginStatus(false);
      localStorage.removeItem('user_id');
      localStorage.removeItem('userrole');
    }
  }
  
  const userInstance = new User();
  
  export default userInstance;
  