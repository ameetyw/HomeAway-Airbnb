import { userService } from '../../services/user.service';

const emptyDates = {
    startDate: null,
    endDate: null
};

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    searchInput: {
        dates: emptyDates,
        guests: {}
    },
    currStay: null,
    currBooking: {
        stayDates: emptyDates,
        stayGuests: { adults: 1 }
    },
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.loggedInUser
            };
        case 'SET_SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.searchInput
            };
            case 'SET_STAY':
            return {
                ...state,
                currStay: action.stay
            };
        case 'SET_BOOKING':
            return {
                ...state,
                currBooking: action.currBooking
            };
        case 'SET_DATES':
            if (action.datesDetails.type === 'search') {
                return {
                    ...state,
                    searchInput: { ...state.searchInput, dates: action.datesDetails.dates }
                };
            } else return {
                ...state,
                currBooking: { ...state.currBooking, stayDates: action.datesDetails.dates }
            };
        case 'SET_GUESTS':
            if (action.guestsDetails.type === 'search') {
                return {
                    ...state,
                    searchInput: { ...state.searchInput, guests: action.guestsDetails.guests }
                };
            } else return {
                ...state,
                currBooking: { ...state.currBooking, stayGuests: action.guestsDetails.guests }
            };
        case 'SET_DESTINATION':
            return {
                ...state,
                searchInput: { ...state.searchInput, destination: action.destination }
            };
        default:
            return state;
    }
};