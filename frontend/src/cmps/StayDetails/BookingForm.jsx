import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getGuestsTitle } from '../../services/formatting.service';
import { RatingReviews } from './RatingReviews';
import { GuestsPicker } from '../GuestsPicker';
import { DatesBtn } from './DatesBtn';
import { ExpandedDatesForm } from './ExpandedDatesForm';
import { StayFormPricing } from './StayFormPricing';
import { ReactComponent as ArrowDown } from '../../assets/imgs/icons/general/icon-arrowhead-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/imgs/icons/general/icon-arrowhead-up.svg';
// import { ReactComponent as FlagIcon } from '../../assets/imgs/icons/general/icon-flag.svg';

export const BookingForm = ({ stay, scrollToReviews, isMobile }) => {
    const { stayDates, stayGuests } = useSelector(state => state.appModule.currBooking);
    const { startDate, endDate } = stayDates;

    const [isGuestsOpen, setGuestsOpen] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState({ isStartOpen: false, isEndOpen: false });
    const { isStartOpen, isEndOpen } = isCalendarOpen;
    const [style, setStyle] = useState({ backgroundPositionX: '50%', backgroundPositionY: '50%' });

    useEffect(() => {
        if (isGuestsOpen || isStartOpen || isEndOpen) {
            window.addEventListener('keydown', isEsc);
        }
        return () => {
            window.removeEventListener('keydown', isEsc);
        };
    }, [isGuestsOpen, isStartOpen, isEndOpen]);

    const isEsc = (ev) => { if (ev.key === 'Escape') closeInputs(); };

    const closeInputs = () => {
        setGuestsOpen(false);
        setCalendarOpen({ isStartOpen: false, isEndOpen: false });
    };

    const mouseOverBtn = (ev) => {
        const rect = ev.target.getBoundingClientRect();
        const posX = (rect.right - ev.clientX) / rect.width * 100;
        const posY = (rect.bottom - ev.clientY) / rect.height * 100;
        setStyle({ backgroundPositionX: `${posX}%`, backgroundPositionY: `${posY}%` });
    };

    const getFormattedDate = (date) => {
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="booking-form">
            <div className="form-header flex">
                <div className="night-price">
                    <span>${stay.price}</span> / night
                </div>
                {isMobile && startDate && endDate ?
                    <p className="dates">{getFormattedDate(startDate)} – {getFormattedDate(endDate)}</p> :
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviewsCount} scrollToReviews={scrollToReviews} />
                }
            </div>

            <div className="form-input">
                <DatesBtn title="Check-in" date={startDate}
                    isBtnOpen={isStartOpen}
                    openCalendar={setCalendarOpen}
                    calendarState={{ isStartOpen: true, isEndOpen: false }} />
                <span className="divider"></span>
                <DatesBtn title="Check-out" date={endDate}
                    isBtnOpen={isEndOpen}
                    openCalendar={setCalendarOpen}
                    calendarState={{ isStartOpen: false, isEndOpen: true }} />

                <button
                    className={`guests${isGuestsOpen ? " open" : ""} flex align-center`}
                    onClick={() => setGuestsOpen(!isGuestsOpen)}>
                    <span>
                        <h4 className="title">Guests</h4>
                        {/* <span className="input fs14">
                            {getGuestsTitle(stayGuests)}
                        </span> */}
                        {getGuestsTitle(stayGuests)}
                    </span>
                    {isGuestsOpen ? <ArrowUp /> : <ArrowDown />}
                </button>
                <ExpandedDatesForm
                    isCalendarOpen={isCalendarOpen}
                    setCalendarOpen={setCalendarOpen} />

                <div className={`guests-picker-wrapper${isGuestsOpen ? " open" : ""}` +
                    `${isStartOpen || isEndOpen ? " hide" : ""}`} >
                    <GuestsPicker stay={stay} />
                    <span className="close-btn-wrapper flex justify-end">
                        <button className="clear-btn large"
                            onClick={() => { setGuestsOpen(false); }}>
                            Close
                        </button>
                    </span>
                </div>
                <span className={`screen${isGuestsOpen || isStartOpen || isEndOpen ? " open" : ""}`}
                    onClick={closeInputs}></span>
            </div>

            <button className="reserve-btn title">
                {!endDate || !startDate ? "Check availability" : "Reserve"}
                <span onMouseMove={mouseOverBtn} style={style}>
                    {!endDate || !startDate ? "Check availability" : "Reserve"}
                </span>
            </button>

            {(startDate && endDate) &&
                <StayFormPricing nightPrice={stay.price}
                    nightCount={(endDate - startDate) / (1000 * 60 * 60 * 24)}
                    cleaningFee={stay.cleaning} />}

            {/* <span className="report">
                <button className="report-btn fs14 title flex align-center">
                    <FlagIcon />
                    Report this listing
                </button>
            </span> */}
        </div>
    );
};