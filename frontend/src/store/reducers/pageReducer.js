const initialState = {
    isSearchExpand: false,
    isGoogleScriptLoaded: false,
    screenSize: null,
    isMobile: true,
    isHomeTop: false,
};

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SEARCH_EXPAND':
            return {
                ...state,
                isSearchExpand: action.isSearchExpand
            };
        case 'SET_HOME_TOP':
            return {
                ...state,
                isHomeTop: action.isHomeTop
            };
        case 'SET_SCREEN_SIZE':
            return {
                ...state,
                screenSize: action.screenSize
            };
        case 'SET_IS_MOBILE':
            return {
                ...state,
                isMobile: action.isMobile
            };
        case 'SET_GOOGLE_LOAD':
            return {
                ...state,
                isGoogleScriptLoaded: action.isLoaded
            };
        default:
            return state;
    }
};