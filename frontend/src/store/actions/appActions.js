export function setHomeTop(isHomeTop) {
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

export function setStay(currStay) {
    return {
        type: 'SET_STAY',
        currStay
    };
}

export function saveBooking(currBooking) {
    return {
        type: 'SET_BOOKING',
        currBooking
    };
}

export function setSearch(searchInput) {
    return {
        type: 'SET_SEARCH_INPUT',
        searchInput
    };
}

// details are {type:'search/stay', dates}
export function setDates(datesDetails) {
    return {
        type: 'SET_DATES',
        datesDetails
    };
}

// details are {type:'search/stay', guests}
export function setGuests(guestsDetails) {
    return {
        type: 'SET_GUESTS',
        guestsDetails
    };
}