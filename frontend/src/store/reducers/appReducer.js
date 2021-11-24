import { userService } from '../../services/user.service';

const emptyDates = {
    startDate: null,
    endDate: null
};

const emptyGuests = {
    adults: 1,
};

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    isHomeTop: false,
    isSearchExpand: false,
    searchInput: {
        dates: emptyDates,
        guests: emptyGuests
    },
    currStay: {},
    currBooking: {
        stayDates: emptyDates,
        stayGuests: emptyGuests
    },
};

// currBooking = {
//     stayId, only if 
//     userId, 
//     stayDates, [start,end]
//     stayGuests, {adults, children, infants, pets}
//     price
// }
// searchInput = {
//     destination,
//     dates,
//     guests
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
        case 'SET_SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.searchInput
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
        // case 'SET_DATES':
        //     return {
        //         ...state,
        //         currBooking: { ...state.currBooking, stayDates: action.dates }
        //     };
        case 'SET_DATES':
            {
                if (action.datesDetails.type === 'search') {
                    return {
                        ...state,
                        searchInput: { ...state.searchInput, searchDates: action.datesDetails.dates }
                    };
                }
                return {
                    ...state,
                    currBooking: { ...state.currBooking, stayDates: action.datesDetails.dates }
                };
            }
        // case 'SET_GUESTS':
        //     return {
        //         ...state,
        //         currBooking: { ...state.currBooking, stayGuests: action.guests }
        //     };
        case 'SET_GUESTS':
            {
                if (action.guestsDetails.type === 'search') {
                    return {
                        ...state,
                        searchInput: { ...state.searchInput, guests: action.guestsDetails.guests }
                    };
                }
                return {
                    ...state,
                    currBooking: { ...state.currBooking, stayGuests: action.guestsDetails.guests }
                };
            }
        default:
            return state;
    }
};