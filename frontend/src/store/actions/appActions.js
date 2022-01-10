export function setUser(loggedInUser) {
    return {
        type: 'SET_USER',
        loggedInUser
    };
}

export function setStay(stay) {
    return {
        type: 'SET_STAY',
        stay
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
    console.log('action:', datesDetails);
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

export function setDestination(destination) {
    return {
        type: 'SET_DESTINATION',
        destination
    };
}