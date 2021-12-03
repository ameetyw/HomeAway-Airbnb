import { InfoHeader } from './InfoHeader';
import { StayDescription } from './StayDescription';
import { StayAmenities } from './StayAmenities';
import { StayDates } from './StayDates';
import { StayLocation } from './StayLocation';

export const StayInfo = ({ stay, isMobile }) => {
    return (
        <section className="stay-info flex column">
            <InfoHeader stay={stay} />
            <div className="features sub-section">features</div>
            <StayDescription desc={stay.description} />
            <StayAmenities amenities={stay.amenities} />
            {isMobile && <StayLocation location={stay.loc} isMobile={true} />}
            <StayDates stay={stay} />
        </section>
    );
};