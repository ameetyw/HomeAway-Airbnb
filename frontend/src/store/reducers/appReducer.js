import { userService } from '../../services/user.service';

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    isHomeTop: false,
    isSearchExpand: false,
    currStay: {},
    currBooking: {}
};

// currBooking = {
//     stayId, 
//     userId, 
//     stayDates, [start,end]
//     stayGuests, {adults, children, infants, pets}
//     price
// }

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.loggedInUser
            };
        case 'SET_HOME_TOP':
            return {
                ...state,
                isHomeTop: action.isHomeTop
            };
        case 'SET_SEARCH_EXPAND':
            return {
                ...state,
                isSearchExpand: action.isSearchExpand
            };
        case 'SET_STAY':
            return {
                ...state,
                currStay: action.currStay
            };
        case 'SET_BOOKING':
            return {
                ...state,
                currBooking: action.currBooking
            };
        case 'SET_DATES':
            return {
                ...state,
                currBooking: { ...state.currBooking, stayDates: action.dates }
            };
        case 'SET_GUESTS':
            return {
                ...state,
                currBooking: { ...state.currBooking, stayGuests: action.guests }
            };
        default:
            return state;
    }
};