import { useState } from 'react';
import { InfoHeader } from './InfoHeader';
import { StayDescription } from './StayDescription';
import { StayAmenities } from './StayAmenities';
import { DatePickerRange } from '../DatePickerRange';

export const StayInfo = ({ stay, stayDates, setDates }) => {
    const [calendarOpen, setCalendarOpen] = useState([true, false]);

    const getDatesHeader = () => {
        const [startDate, endDate] = stayDates;
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
                <h2>{getDatesHeader(stayDates)}</h2>
                <DatePickerRange
                    excludeDates={stay.unavailableDates}
                    isOpen={calendarOpen}
                    setIsOpen={setCalendarOpen}
                    dates={stayDates}
                    setDates={setDates}
                />
                <button className="clear-dates" onClick={() => setDates([null, null])}>Clear dates</button>
            </section>
        </section>
    );
};