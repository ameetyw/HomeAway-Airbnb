export function setHomeTop(isHomeTop) {
    // console.log('appAction setHomeTop:', isHomeTop);
    return {
        type: 'SET_HOME_TOP',
        isHomeTop
    };
}

export function setSearchExpand(isSearchExpand) {
    return {
        type: 'SET_SEARCH_EXPAND',
        isSearchExpand
    };
}

export function setUser(loggedInUser) {
    return {
        type: 'SET_USER',
        loggedInUser
    };
}