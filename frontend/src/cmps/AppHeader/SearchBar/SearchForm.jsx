import { useState, useEffect } from 'react';
import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-glass.svg';
import { DynamicSearchBtn } from './DynamicSearchBtn';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchExpand } from '../../../store/actions/appActions';

export const SearchForm = ({ isSearchExpand, isHomeTop }) => {
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState({
        location: false,
        dates: false,
        guests: false,
        isActive: false
    });
    const btnTypes = ["location", "dates", "guests"];

    useEffect(() => {
        if (!isSearchExpand) closeSearch();
    }, [isSearchExpand]);

    const toggleBtnIsOpen = (ev, type) => {
        ev.stopPropagation();
        console.log('toggle');
        if (btnTypes.includes(type)) {
            const newIsOpen = { ...isOpen };
            Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
            if (type === 'location') newIsOpen.location = true;
            else newIsOpen[type] = !isOpen[type];
            newIsOpen.isActive = true;
            setOpen(newIsOpen);
        }
    };

    const closeAllBtns = () => {
        const newIsOpen = { ...isOpen };
        Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
        setOpen(newIsOpen);
    };

    const closeSearch = () => {
        if (!isHomeTop) dispatch(setSearchExpand(false));
        closeAllBtns();
    };

    const onSearch = (ev) => {
        ev.preventDefault();
        // ev.stopPropagation();
        console.log('search...');
    };

    return (
        <>
            <span className={`form-screen${isOpen.isActive ? " active" : ""}`} onClick={closeAllBtns}>
                <form className=
                    {`expanded-search flex align-center${isSearchExpand ? " open" : ""}${isOpen.isActive ? " active" : ""}`}>
                    <DynamicSearchBtn type="location" subtitle="Where are you going?" isOpen={isOpen.location} toggleIsOpen={toggleBtnIsOpen} />
                    <span className={`dates-wrapper flex${isOpen.dates ? " open" : ""}`} onClick={(ev) => toggleBtnIsOpen(ev, 'dates')}>
                        <DynamicSearchBtn type="check-in" subtitle="Add dates" />
                        <DynamicSearchBtn type="check-out" subtitle="Add dates" />
                    </span>
                    <DynamicSearchBtn type="guests" subtitle="Add guests" isOpen={isOpen.guests} toggleIsOpen={toggleBtnIsOpen}>
                        <button className={`search-btn center-content`} onClick={onSearch}>
                            <span className="btn-content flex align-center">
                                <MagnifyGlassIcon />
                                <span className="open">Search</span>
                            </span>
                        </button>
                    </DynamicSearchBtn>
                </form>
            </span>
            <span className={`close-search${isSearchExpand ? " active" : ""}${isHomeTop ? " home-top" : ""}`} onClick={closeSearch} />
        </>
    );
};