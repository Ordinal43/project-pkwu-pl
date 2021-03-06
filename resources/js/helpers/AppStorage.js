class AppStorage
{
    storeToken(token) {
        localStorage.setItem('bazaar-pl-token',token);
    }
    storeUser(user) {
        localStorage.setItem('bazaar-pl-user',user);
    }

    store(user,token) {
        this.storeToken(token);
        this.storeUser(user);
    }

    clear() {
        localStorage.removeItem('bazaar-pl-token');
        localStorage.removeItem('bazaar-pl-user');
    }

    getToken() {
        return localStorage.getItem('bazaar-pl-token');
    }
    getUser() {
        let user = localStorage.getItem('bazaar-pl-user');
        return JSON.parse(user);
    }
}
export default AppStorage = new AppStorage();