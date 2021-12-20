import { useState, useEffect } from 'react';

export const GoogleMapMarker = ({ map, options, info, targetUrl }) => {
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        } else if (marker) {
            options.map = map;
            marker.setOptions(options);
            if (info) {
                const infoWindow = new window.google.maps.InfoWindow({ content: info });
                const openInfo = () => {
                    infoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                };
                openInfo();
                marker.addListener("click", openInfo);
            } else if (targetUrl) {
                marker.addListener("click", () => window.open(targetUrl, '_blank'));
            }
        }
        return () => {
            if (marker) {
                // if (info || targetUrl) marker.removeListener("click", ev => ev);
                marker.setMap(null);
            }
        };
    }, [marker]);

    return null;
};