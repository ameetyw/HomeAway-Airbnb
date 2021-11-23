import { useState } from 'react';
import { RatingReviews } from './RatingReviews';
import { ReactComponent as ArrowDown } from '../../assets/imgs/icons/general/icon-arrowhead-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/imgs/icons/general/icon-arrowhead-up.svg';
import { DatePickerRange } from '../DatePickerRange';

export const BookingForm = ({ stay, stayDates, setDates, stayGuests, setGuests }) => {
    const [isGuestsOpen, setGuestsOpen] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState([false, false]);
    const [isStartOpen, isEndOpen] = isCalendarOpen;
    const [startDate, endDate] = stayDates;
    // const { adults, children, infants, pets } = stayGuests;

    const getDatesHeader = () => {
        if (!startDate || !endDate) return 'Select dates';
        const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
        return `${nights} nights`;
    };

    const getDatesSubheader = () => {
        if (!startDate || !endDate) return "Add your travel dates for exact pricing";
        const start = startDate.toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
        const end = endDate.toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
        return `${start} - ${end}`;
    };

    const getFormattedDate = (date) => {
        return date.toLocaleDateString('en-IE', { day: "numeric", month: "numeric", year: "numeric" });
    };

    const closeInputs = () => {
        setGuestsOpen(false);
        setCalendarOpen([false, false]);
    };

    return (
        <div className="booking-form">
            <div className="form-header flex align-center space-between">
                <div className="night-price">
                    <span>${stay.price}</span> / night
                </div>
                <div className="info-sum flex">
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviews.length} />
                </div>
            </div>

            <div className="form-input">
                <button className={`dates${isStartOpen ? " open" : ""}`} onClick={() => setCalendarOpen([true, false])}>
                    <h4 className="title">Check-in</h4>
                    <span className={`input${!startDate ? " placeholder" : ""}`}>
                        {startDate ? getFormattedDate(startDate) : "Add date"}
                    </span>
                </button>
                <button className={`dates${isEndOpen ? " open" : ""}`} onClick={() => setCalendarOpen([false, true])}>
                    <h4 className="title">Check-out</h4>
                    <span className={`input${!endDate ? " placeholder" : ""}`}>
                        {endDate ? getFormattedDate(endDate) : "Add date"}
                    </span>
                </button>

                <button className="guests flex align-center" onClick={() => setGuestsOpen(!isGuestsOpen)}>
                    <span>
                        <h4 className="title">Guests</h4>
                        <span className="input">1 guest</span>
                    </span>
                    {isGuestsOpen ? <ArrowUp /> : <ArrowDown />}
                </button>

                <div className={`calendar-wrapper${isStartOpen || isEndOpen ? " open" : ""}`} >
                    <h2>{getDatesHeader()}</h2>
                    <p>{getDatesSubheader()}</p>
                    <DatePickerRange
                        excludeDates={stay.unavailableDates}
                        isOpen={isCalendarOpen}
                        setIsOpen={setCalendarOpen}
                        dates={stayDates}
                        setDates={setDates}
                    />
                    <span className="dates-ctrl">
                        <button className="clear-dates" onClick={() => setDates([null, null])}>Clear dates</button>
                        <button className="close-dates" onClick={() => setCalendarOpen([false, false])}>Close</button>
                    </span>
                </div>

                <span className={`screen${isGuestsOpen || isStartOpen || isEndOpen ? " open" : ""}`} onClick={closeInputs}></span>
            </div>
        </div>
    );
};