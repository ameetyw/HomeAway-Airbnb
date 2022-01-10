export function setSearchExpand(isSearchExpand) {
    return {
        type: 'SET_SEARCH_EXPAND',
        isSearchExpand
    };
}

export function setHomeTop(isHomeTop) {
    return {
        type: 'SET_HOME_TOP',
        isHomeTop
    };
}

export function setScreenSize(screenSize) {
    return {
        type: 'SET_SCREEN_SIZE',
        screenSize
    };
}

export function setIsMobile(isMobile) {
    return {
        type: 'SET_IS_MOBILE',
        isMobile
    };
}

export function setIsGoogleLoad(isLoaded) {
    return {
        type: 'SET_GOOGLE_LOAD',
        isLoaded
    };
}