import { Link } from 'react-router-dom';
import { getGuestsTitle } from '../../../services/formatting.service';
import { PlacesAutocomplete } from '../../PlacesAutocomplete';
// import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-mobile.svg';
import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-glass.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/imgs/icons/header/icon-dates-mobile.svg';
import { ReactComponent as GuestIcon } from '../../../assets/imgs/icons/header/icon-guests-mobile.svg';

export const MobileSearch = ({ isOpen, toggleBtnIsOpen, searchDates, searchGuests }) => {

    const getDateSubtitle = () => {
        if (!searchDates.startDate && !searchDates.endDate) {
            return <p className="subtitle placeholder">Add dates</p>;
        }

        const getFormattedDate = date => date ? date.toLocaleString('en-US', { month: 'short', day: 'numeric' }) : '';

        return <p className="subtitle">
            {getFormattedDate(searchDates.startDate) + '-' +
                getFormattedDate(searchDates.endDate)}
        </p>;
    };

    return <>
        <span className="form-container fs14">
            <label htmlFor="location-input"
                className={`location flex align-center${isOpen.location ? " open" : ""}`}
                onClick={(ev) => toggleBtnIsOpen(ev, 'location')}>
                <MagnifyGlassIcon />
                <PlacesAutocomplete />
            </label>

            <span className={"dates flex align-center" +
                `${(isOpen.startDate || isOpen.endDate) ? " open" : ""}`}
                onClick={(ev) => toggleBtnIsOpen(ev, 'startDate')}>
                <CalendarIcon />
                {getDateSubtitle()}
            </span>

            <span className={`guests flex align-center${isOpen.guests ? " open" : ""}`}
                onClick={(ev) => toggleBtnIsOpen(ev, 'guests')}>
                <GuestIcon />
                {getGuestsTitle(searchGuests)}
            </span>
        </span>

        <Link to="/explore">
            <button className="search-btn center-content">
                <MagnifyGlassIcon />
                <span className="btn-content">
                    Search
                </span>
            </button>
        </Link>
    </>;
};