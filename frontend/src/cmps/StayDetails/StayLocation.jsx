import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isContentOverflown } from '../../services/util.service';
import { GoogleMap } from '../GoogleMap';
import { GoogleMapMarker } from '../GoogleMapMarker';
import { ShowMoreBtn } from '../ShowMoreBtn';
import { Loader } from '../Loader';

export const StayLocation = ({ location }) => {
    const { isGoogleScriptLoaded } = useSelector(state => state.appModule);
    const widthRefEl = useRef(null);
    const [isShowMore, setShowMore] = useState(false);
    const [mapMarkerOptions, setMarkerOptions] = useState(null);

    useEffect(() => {
        if (isGoogleScriptLoaded) setMarkerOptions({
            position: location.pos,
            label: {
                text: "\ue88a",
                fontFamily: "Material-Icons-Round",
                color: "#fff",
                fontSize: "1.75rem",
            },
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                strokeColor: '#e31c5f',
                strokeWeight: 23,
            }
        });
    }, [isGoogleScriptLoaded]);

    useEffect(() => {
        if (widthRefEl.current) setShowMore(isContentOverflown(widthRefEl.current));
    }, [widthRefEl.current]);

    const LocationTitle = ({ className = "" }) => {
        return <p className={className}>{location.city}, {location.country}</p>;
    };

    return (
        <section className="stay-location sub-section">
            <h2>Where you'll be</h2>
            {!location.desc && <LocationTitle className="no-desc fs16" />}

            {isGoogleScriptLoaded ? <GoogleMap center={location.pos} zoom={14}>
                <GoogleMapMarker
                    options={mapMarkerOptions}
                    info={'<p class="map-info-window">Exact location provided after booking.</p>'} />
            </GoogleMap> : <Loader /> }
            
            {location.desc ? <>
                <LocationTitle className="title fs16" />
                <p ref={widthRefEl} className="location-desc clamp-3-lines">
                    {location.desc}
                </p>
                {/* {isShowMore && <ShowMoreBtn />} */}
            </> : ''}
        </section>
    );

};