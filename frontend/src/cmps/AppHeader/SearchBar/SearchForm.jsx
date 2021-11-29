import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchExpand, getGuestsTitle } from '../../../store/actions/appActions';
import { DynamicSearchBtn } from './DynamicSearchBtn';
import { GuestsPicker } from '../../GuestsPicker';
import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-glass.svg';
import { DatePickerRange } from '../../DatePickerRange';

export const SearchForm = ({ isSearchExpand, isHomeTop }) => {
    const dispatch = useDispatch();
    const searchDates = useSelector(state => state.appModule.searchInput.dates);
    const searchGuests = useSelector(state => state.appModule.searchInput.guests);
    const [isOpen, setOpen] = useState({
        location: false,
        startDate: false,
        endDate: false,
        guests: false,
        isFormActive: false
    });

    useEffect(() => {
        if (!isSearchExpand) closeSearch();
    }, [isSearchExpand]);

    useEffect(() => {
        if (isOpen.isFormActive) {
            console.log('on..');
            window.addEventListener('keydown', isEsc);
        }
        return () => {
            console.log('off..');
            window.removeEventListener('keydown', isEsc);
        };
    }, [isOpen.isFormActive]);

    const isEsc = (ev) => {
        ev.stopPropagation();
        console.log('keydown in search form');
        if (ev.key === 'Escape') closeSearch();
    };

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
        if (!isHomeTop) dispatch(setSearchExpand(false));
        closeAll();
    };

    const onSearch = (ev) => {
        ev.preventDefault();
        // ev.stopPropagation();
        console.log('search...');
    };

    const getDateSubtitle = (date) => {
        if (!date) return 'Add dates';
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    };

    const stopProp = (ev) => {
        ev.stopPropagation();
    };

    return (
        <>
            <span className={`form-screen${isOpen.isFormActive ? " active" : ""}`} onClick={closeAll}>
                <form className=
                    {`expanded-search flex align-center${isSearchExpand ? " open" : ""}${isOpen.isFormActive ? " active" : ""}`}>
                    <DynamicSearchBtn type="location" subtitle="Where are you going?" isOpen={isOpen.location} toggleIsOpen={toggleBtnIsOpen} />
                    <span className="dates-wrapper flex">
                        <DynamicSearchBtn type="check-in"
                            subtitle={getDateSubtitle(searchDates.startDate)}
                            isOpen={isOpen.startDate} toggleIsOpen={toggleBtnIsOpen} />
                        <DynamicSearchBtn type="check-out"
                            subtitle={getDateSubtitle(searchDates.endDate)}
                            isOpen={isOpen.endDate} toggleIsOpen={toggleBtnIsOpen} />
                    </span>
                    <DynamicSearchBtn type="guests"
                        subtitle={getGuestsTitle(searchGuests)}
                        isOpen={isOpen.guests} toggleIsOpen={toggleBtnIsOpen}>
                        <button className={`search-btn center-content`} onClick={onSearch}>
                            <span className="btn-content flex align-center">
                                <MagnifyGlassIcon />
                                <span className="open">Search</span>
                            </span>
                        </button>
                    </DynamicSearchBtn>
                    {isOpen.guests && <div className="guests-picker-wrapper popover" onClick={stopProp}>
                        <GuestsPicker />
                    </div>}
                    {(isOpen.startDate || isOpen.endDate) && <div className="date-picker-wrapper popover" onClick={stopProp}>
                        <DatePickerRange isStay={false}
                            isOpen={{ isStartOpen: isOpen.startDate, isEndOpen: isOpen.endDate }}
                            setIsOpen={setCalendarState} />
                    </div>}
                </form>
            </span>
            <span className={`close-search${isSearchExpand ? " active" : ""}${isHomeTop ? " home-top" : ""}`} onClick={closeSearch} />
        </>
    );
};