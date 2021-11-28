import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDates } from '../../store/actions/appActions';
import { InfoHeader } from './InfoHeader';
import { StayDescription } from './StayDescription';
import { StayAmenities } from './StayAmenities';
import { DatePickerRange } from '../DatePickerRange';

export const StayInfo = ({ stay }) => {
    const dispatch = useDispatch();
    const [calendarOpen, setCalendarOpen] = useState({ isStartOpen: true, isEndOpen: false });
    const { stayDates } = useSelector(state => state.appModule.currBooking);

    const getDatesHeader = () => {
        const { startDate, endDate } = stayDates;
        if (!startDate && !endDate) return 'Select check-in date';
        else if (!endDate) return 'Select check-out date';
        const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
        return `${nights} nights in ${stay.loc.city}`;
    };

    return (
        <section className="stay-info flex column">
            <InfoHeader stay={stay} />
            <div className="features info-section">features</div>
            <StayDescription desc={stay.description} />
            <StayAmenities amenities={stay.amenities} />
            <section className="select-dates info-section">
                <h2>{getDatesHeader()}</h2>
                <p className="fs14">Add your travel dates for exact pricing</p>
                <DatePickerRange
                    isStay={true}
                    isOpen={calendarOpen}
                    setIsOpen={setCalendarOpen}
                    excludeDates={stay.unavailableDates}
                />
                <span className="clear-btn-wrapper flex justify-end">
                    <button className="clear-dates"
                        onClick={() => dispatch(
                            setDates({ type: 'stay', dates: { startDate: null, endDate: null } }))}>
                        Clear dates
                    </button>
                </span>
            </section>
        </section>
    );
};