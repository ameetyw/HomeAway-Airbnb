import { useState, useEffect, useRef } from 'react';
import { isContentOverflown } from '../../services/util.service';
import { GoogleMap } from '../GoogleMap';
import { ShowMoreBtn } from '../ShowMoreBtn';

// "loc": {
//     "country": "Israel",
//     "countryCode": "ISR",
//     "city": "Tel Aviv-Yafo",
//     "address": "Nahalat Binyamin St 77",
//     "zip": "",
//     "lat": 32.06196364406076,
//     "lng": 34.77239418059386
// }
export const StayLocation = ({ location, isMobile }) => {
    const widthRefEl = useRef(null);
    const [isShowMore, setShowMore] = useState(false);

    useEffect(() => {
        if (widthRefEl.current) setShowMore(isContentOverflown(widthRefEl.current));
    }, [widthRefEl.current]);

    const LocationTitle = ({ className = "" }) => {
        return <p className={className}>{location.city}, {location.country}</p>;
    };

    return (
        <section className="stay-location info-section">
            <h2>Where you'll be</h2>
            {!location.desc && <LocationTitle className="no-desc fs16" />}

            <GoogleMap center={location.pos} zoom={14} isMobile={isMobile} />

            {location.desc && <>
                <LocationTitle className="title fs16" />
                <p ref={widthRefEl} className="location-desc clamp-3-lines">
                    {location.desc}
                </p>
                {isShowMore && <ShowMoreBtn />}
            </>}
        </section>
    );

};