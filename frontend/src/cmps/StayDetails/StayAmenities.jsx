import { importImgs } from '../../services/util.service';

export const StayAmenities = ({ amenities }) => {
    const amenityIcons = importImgs(require.context('../../assets/imgs/icons/amenities', false, /\.(png|jpe?g|svg)$/));
    const amenitiesForDisplay = amenities.filter(amenity => amenity.displayScore).sort((a1, a2) => (a1.displayScore - a2.displayScore)).slice(0, 10);
    const isNoSmokeAlarm = amenities.some(amenity => amenity.iconName === 'smokealarm') ? 0 : 1;
    const isNoCMOAlarm = amenities.some(amenity => amenity.iconName === 'cmoalarm') ? 0 : 1;
    while (amenitiesForDisplay.length + isNoSmokeAlarm + isNoCMOAlarm > 10) {
        amenitiesForDisplay.pop();
    }

    return (
        <div className="amenities sub-section">
            <h2 className="title">What this place offers</h2>
            <div className="amenities-list">
                {amenitiesForDisplay.map((amenity, idx) => (
                    <span key={`amenity${idx + 1}`} className={`amenity flex align-center${idx < 5 ? "" : " wide-display"}`}>
                        <img src={amenityIcons[`icon-${amenity.iconName}`].default} alt="" />
                        {amenity.amenity}
                    </span>
                ))}
                {isNoCMOAlarm ?
                    <span className="missing-safety amenity flex align-center">
                        <img src={amenityIcons['icon-nocmoalarm'].default} alt="" />
                        Carbon monoxide alarm
                    </span> : <></>}
                {isNoSmokeAlarm ?
                    <span className="missing-safety amenity flex align-center">
                        <img src={amenityIcons['icon-nosmokealarm'].default} alt="" />
                        Smoke alarm
                    </span> : <></>}
            </div>
            <button className="show-all-btn">Show all {amenities.length} amenities</button>
        </div>
    );
};