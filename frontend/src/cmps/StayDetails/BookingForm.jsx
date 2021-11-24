import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RatingReviews } from './RatingReviews';
import { GuestsPicker } from '../GuestsPicker';
import { DatesBtn } from './DatesBtn';
import { ReactComponent as ArrowDown } from '../../assets/imgs/icons/general/icon-arrowhead-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/imgs/icons/general/icon-arrowhead-up.svg';
import { ExpandedDatesForm } from './ExpandedDatesForm';

export const BookingForm = ({ stay }) => {
    const booking = useSelector(state => state.appModule.currBooking);
    const { stayDates, stayGuests } = booking;
    const { startDate, endDate } = stayDates;

    const [isGuestsOpen, setGuestsOpen] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState({ isStartOpen: false, isEndOpen: false });
    const { isStartOpen, isEndOpen } = isCalendarOpen;
    const { adults, children, infants, pets } = stayGuests;
    const totalGuests = adults + (children || 0);

    const closeInputs = () => {
        setGuestsOpen(false);
        setCalendarOpen({ isStartOpen: false, isEndOpen: false });
    };

    return (
        <div className="booking-form">
            <div className="form-header flex">
                <div className="night-price">
                    <span>${stay.price}</span> / night
                </div>
                <div className="info-sum flex">
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviews.length} />
                </div>
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
                        <span className="input fs14">
                            {`${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
                            {infants ? `, ${infants} infant${infants > 1 ? "s" : ""}` : ""}
                            {pets ? `, ${pets} pet${pets > 1 ? "s" : ""}` : ""}
                        </span>
                    </span>
                    {isGuestsOpen ? <ArrowUp /> : <ArrowDown />}
                </button>

                <ExpandedDatesForm
                    isCalendarOpen={isCalendarOpen}
                    setCalendarOpen={setCalendarOpen} />

                <div className={`guests-wrapper${isGuestsOpen ? " open" : ""}` +
                    `${isStartOpen || isEndOpen ? " hide" : ""}`} >
                    <GuestsPicker stay={stay} />
                    <span className="close-btn-wrapper flex justify-end">
                        <button onClick={() => { setGuestsOpen(false); }}>
                            Close
                        </button>
                    </span>
                </div>

                <span className={`screen${isGuestsOpen || isStartOpen || isEndOpen ? " open" : ""}`}
                    onClick={closeInputs}></span>
            </div>
        </div>
    );
};