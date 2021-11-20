import { InfoHeader } from './InfoHeader';
import { StayDescription } from './StayDescription';
import { StayAmenities } from './StayAmenities';

export const StayInfo = ({ stay }) => {
    return (
        <section className="stay-info flex column">
            <InfoHeader stay={stay} />
            <div className="features info-section">features</div>
            <StayDescription desc={stay.description} />
            <StayAmenities amenities={stay.amenities} />
        </section>
    );
};