import { useState, useEffect, useRef, Children, cloneElement } from 'react';

export const GoogleMap = ({ zoom, center, children }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                zoom,
                center,
                maxZoom: 17,
                mapTypeControl: false
            }));
        }
    }, [mapRef.current]);

    return <>
        <div className="map" ref={mapRef} />
        {Children.map(children, child => cloneElement(child, { map }))}
    </>;
};