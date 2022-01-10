import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDates, setGuests } from '../../../store/actions/appActions';
import { setSearchExpand } from '../../../store/actions/pageActions';
import { RegSearchForm } from './RegSearchForm';
import { GuestsPicker } from '../../GuestsPicker';
import { DatePickerRange } from '../../DatePickerRange';
import { MobileSearch } from './MobileSearch';

export const SearchForm = ({ isSearchExpand, isHomeTop }) => {
    const dispatch = useDispatch();
    const { isMobile } = useSelector(state => state.pageModule);
    const { dates: searchDates, guests: searchGuests } = useSelector(state => state.appModule.searchInput);
    const [isOpen, setOpen] = useState({
        location: false,
        startDate: false,
        endDate: false,
        guests: false,
        isFormActive: false
    });

    const setCalendarState = (newState) => {
        const newIsOpen = { ...isOpen };
        newIsOpen.startDate = newState.isStartOpen;
        newIsOpen.endDate = newState.isEndOpen;
        setOpen(newIsOpen);
    };

    const toggleBtnIsOpen = (ev, type) => {
        ev.stopPropagation();
        const newIsOpen = { ...isOpen };
        Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
        if (type === 'location') newIsOpen.location = true;
        else newIsOpen[type] = !isOpen[type];
        newIsOpen.isFormActive = true;
        setOpen(newIsOpen);
    };

    const closeAll = () => {
        const newIsOpen = { ...isOpen };
        Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
        setOpen(newIsOpen);
    };

    const closeSearch = () => {
        closeAll();
        if ((isMobile && !isOpen.isFormActive) || (!isMobile && !isHomeTop)) {
            dispatch(setSearchExpand(false));
        }
    };

    useEffect(() => {
        if (!isSearchExpand) closeSearch();
    }, [isSearchExpand]);

    return (
        <>
            <span className={`form-screen${isOpen.isFormActive ? " active" : ""}`} onClick={closeAll}>
                <form className=
                    {`expanded-search flex align-center${isHomeTop ? " home-top" : ""}` +
                        `${isSearchExpand ? " open" : ""}${isOpen.isFormActive ? " active" : ""}`}>

                    {isMobile ?
                        <MobileSearch
                            isOpen={isOpen}
                            toggleBtnIsOpen={toggleBtnIsOpen}
                            searchDates={searchDates}
                            searchGuests={searchGuests} />
                        :
                        <RegSearchForm
                            isOpen={isOpen}
                            toggleBtnIsOpen={toggleBtnIsOpen}
                            searchDates={searchDates}
                            searchGuests={searchGuests} />
                    }

                    {isOpen.guests &&
                        <div className="guests-picker-wrapper popover" onClick={ev => ev.stopPropagation()}>
                            <GuestsPicker />

                            <span className="dates-ctrl flex justify-end title fs4">
                                <button className={`clear-btn${!Object.keys(searchGuests).length ? " disabled" : ""}`}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        dispatch(setGuests({ type: 'search', guests: {} }));
                                    }}>
                                    Clear
                                </button>
                                <button className="dark-btn"
                                    onClick={closeAll}>
                                    Close
                                </button>
                            </span>
                        </div>
                    }

                    {(isOpen.startDate || isOpen.endDate) &&
                        <div className="date-picker-wrapper popover" onClick={ev => ev.stopPropagation()}>
                            <DatePickerRange isStay={false}
                                isOpen={{ isStartOpen: isOpen.startDate, isEndOpen: isOpen.endDate }}
                                setIsOpen={setCalendarState} />

                            <span className="dates-ctrl flex justify-end title fs4">
                                <button className={`clear-btn${!searchDates.startDate && !searchDates.endDate ? " disabled" : ""}`}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        dispatch(setDates({ type: 'search', dates: { startDate: null, endDate: null } }));
                                    }}>
                                    Clear dates
                                </button>
                                <button className="dark-btn"
                                    onClick={closeAll}>
                                    Close
                                </button>
                            </span>
                        </div>
                    }
                </form>
            </span>
            <span className={`close-search${isSearchExpand ? " active" : ""}${isHomeTop ? " home-top" : ""}`} onClick={closeSearch} />
        </>
    );
};