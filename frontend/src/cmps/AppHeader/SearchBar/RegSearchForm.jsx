import { Link } from 'react-router-dom';
import { getGuestsTitle } from '../../../services/formatting.service';
import { DynamicSearchBtn } from './DynamicSearchBtn';
import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-glass.svg';

export const RegSearchForm = ({ isOpen, toggleBtnIsOpen, searchDates, searchGuests }) => {
    const getDateSubtitle = (date) => {
        if (!date) return <p className="subtitle placeholder">Add dates</p>;
        return <p className="subtitle">
            {date.toLocaleString('en-US', { month: 'short', day: 'numeric' })}
        </p>;
    };

    return <>
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
            <Link to="/explore">
                <button className="search-btn center-content">
                    <span className="btn-content flex align-center">
                        <MagnifyGlassIcon />
                        <span className="open">Search</span>
                    </span>
                </button>
            </Link>
        </DynamicSearchBtn>
    </>;
};