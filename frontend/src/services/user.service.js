import { storageService } from './async-storage.service';

const STORAGE_KEY = 'users';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
    remove,
    update,
    login,
    signup,
    logout,
    getLoggedinUser,
};


// async function getById(userId) {
//     const user = await storageService.get(STORAGE_KEY, userId);
//     if (!user) {
//         console.log('no such user ID:', userId);
//         return null
//     }
//     delete user.password;
//     return user;
// }

function remove(userId) {
    try {
        storageService.remove(STORAGE_KEY, userId);
    } catch (err) {
        console.log('error removing user with ID:', userId, err);
    }
}

async function update(user) {
    try {
        const updatedUser = await storageService.put(STORAGE_KEY, user);
        delete updatedUser.password;
        return updatedUser;
    } catch (err) {
        console.log('Error while updating user with ID:', user._id, err);
    }
}

async function login(userCred) {
    try {
        const users = _getUsers();
        const user = users.find(user => user.username === userCred.username);
        if (!user) return Promise.reject('no such username');
        if (user.password === userCred.password) {
            delete user.password;
            return _saveLocalUser(user);
        }
        return Promise.reject('incorrect password');
    } catch (err) {
        console.log('Error logging in:', err);
    }
}

async function signup(userCred) {
    try {
        const users = _getUsers();
        const isUsernameTaken = users.find(user => user.username === userCred.username);
        if (isUsernameTaken) return Promise.reject('username already exist');
        const user = await storageService.post(STORAGE_KEY, userCred);
        delete user.password;
        return _saveLocalUser(user);
    } catch (err) {
        console.log('Error signing up:', err);
    }
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null');
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    return user;
}

function _getUsers() {
    return storageService.query(STORAGE_KEY);
}