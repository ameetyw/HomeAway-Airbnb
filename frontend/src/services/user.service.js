const LOGGEDIN_USER_KEY = 'loggedinUser';

export const userService = {
    getLoggedinUser,
};


// function logout() {
//     sessionStorage.removeItem(LOGGEDIN_USER_KEY);
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY) || 'null');
}

function _saveLocalUser(user) {
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user));
    return user;
}