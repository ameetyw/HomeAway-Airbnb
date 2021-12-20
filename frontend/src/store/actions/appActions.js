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

export function setCurrScreenSize(currScreenSize) {
    return {
        type: 'SET_SCREEN_SIZE',
        currScreenSize
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

export function setGoogleScriptLoad(isLoaded) {
    return {
        type: 'SET_GOOGLE_LOAD',
        isLoaded
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

export function getGuestsTitle(guestsDetails) {
    if (!Object.keys(guestsDetails).length) return 'Add guests';
    const { adults, children, infants, pets } = guestsDetails;
    const totalGuests = adults + (children || 0);
    let guestsTitle = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
    guestsTitle += infants ? `, ${infants} infant${infants > 1 ? "s" : ""}` : "";
    guestsTitle += pets ? `, ${pets} pet${pets > 1 ? "s" : ""}` : "";
    return guestsTitle;
}