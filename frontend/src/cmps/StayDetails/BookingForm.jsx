import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDates } from '../../store/actions/appActions';
import { RatingReviews } from './RatingReviews';
import { DatePickerRange } from '../DatePickerRange';
import { GuestsPicker } from '../GuestsPicker';
import { ReactComponent as ArrowDown } from '../../assets/imgs/icons/general/icon-arrowhead-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/imgs/icons/general/icon-arrowhead-up.svg';
import { DatesBtn } from './DatesBtn';

export const BookingForm = ({ stay }) => {
    const dispatch = useDispatch();
    const booking = useSelector(state => state.appModule.currBooking);
    const { stayDates, stayGuests } = booking;
    const { startDate, endDate } = stayDates;

    const [isGuestsOpen, setGuestsOpen] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState({ isStartOpen: false, isEndOpen: false });
    const { isStartOpen, isEndOpen } = isCalendarOpen;
    const { adults, children, infants, pets } = stayGuests;
    const totalGuests = adults + (children || 0);

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

    const openCalendar = (calendarState) => {
        if (isGuestsOpen) setGuestsOpen(false);
        setCalendarOpen(calendarState);
    };

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
                    openCalendar={openCalendar}
                    calendarState={{ isStartOpen: true, isEndOpen: false }} />

                <span className="divider"></span>

                <DatesBtn title="Check-out" date={endDate}
                    isBtnOpen={isEndOpen}
                    openCalendar={openCalendar}
                    calendarState={{ isStartOpen: false, isEndOpen: true }} />

                <button className={`guests${isGuestsOpen ? " open" : ""} flex align-center`}
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

                <div className={`dates-wrapper${isStartOpen || isEndOpen ? " open" : ""}`} >
                    <div className="dates-header flex space-between">
                        <span>
                            <h2>{getDatesHeader()}</h2>
                            <p>{getDatesSubheader()}</p>
                        </span>
                        <span className="dates-btns flex">
                            <DatesBtn title="Check-in" date={startDate}
                                isBtnOpen={isStartOpen}
                                // setCalendarOpen={setCalendarOpen}
                                openCalendar={openCalendar}
                                calendarState={{ isStartOpen: true, isEndOpen: false }} />

                            <DatesBtn title="Check-out" date={endDate}
                                isBtnOpen={isEndOpen}
                                openCalendar={openCalendar}
                                // setCalendarOpen={setCalendarOpen}
                                calendarState={{ isStartOpen: false, isEndOpen: true }} />
                        </span>
                    </div>
                    <DatePickerRange
                        isStay={true}
                        isOpen={isCalendarOpen}
                        setIsOpen={setCalendarOpen}
                        excludeDates={stay.unavailableDates}
                    />
                    <span className="dates-ctrl">
                        <button className="clear-dates"
                            onClick={() => dispatch(setDates({ type: 'stay', dates: { startDate: null, endDate: null } }))}>
                            Clear dates
                        </button>
                        <button className="close-dates"
                            onClick={() => setCalendarOpen({ isStartOpen: false, isEndOpen: false })}>
                            Close
                        </button>
                    </span>
                </div>

                <div className={`guests-wrapper${isGuestsOpen ? " open" : ""}`} >
                    <GuestsPicker stay={stay} />
                    <span className="close-btn-wrapper flex justify-end">
                        <button onClick={() => { setGuestsOpen(false); }}>
                            Close
                        </button>
                    </span>
                </div>

                <span className={`screen${isGuestsOpen || isStartOpen || isEndOpen ? " open" : ""}`} onClick={closeInputs}></span>
            </div>
        </div>
    );
};