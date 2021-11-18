import { userService } from '../../services/user.service';

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    isHomeTop: false,
    isSearchExpand: false,
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.loggedInUser
            };
        case 'SET_HOME_TOP':
            {
                return {
                    ...state,
                    isHomeTop: action.isHomeTop
                };
            };
        case 'SET_SEARCH_EXPAND':
            {
                return {
                    ...state,
                    isSearchExpand: action.isSearchExpand
                };
            };
        default:
            return state;
    }
};