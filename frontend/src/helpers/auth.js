
//Set local storage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

//Remove local storage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
}


//Signout
export const signOut = () => {
    removeLocalStorage('user');
}

//Get user info from localstorage
export const isAuth = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
}

//update user data in localstorage
export const updateUser = (response) => {
    if (window !== 'undefined') {
        let user = response.data.user;
        localStorage.setItem('user', user);
    }
}