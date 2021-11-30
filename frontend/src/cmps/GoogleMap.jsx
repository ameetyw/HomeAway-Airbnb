import React, { useState, useEffect, useRef } from 'react';

export const GoogleMap = ({ zoom, center }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    let marker = null;

    useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, { zoom, center, maxZoom: 17 }));
        }
        else if (map) {
            const markerOpt = {
                position: { lat: map.center.lat(), lng: map.center.lng() },
                map,
                label: {
                    text: "\ue88a",
                    fontFamily: "Material-Icons-Round",
                    color: "#fff",
                    fontSize: "28px",
                },
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    strokeColor: '#e31c5f',
                    strokeWeight: 25,
                },
            };
            marker = new window.google.maps.Marker({ position: center, map });
            marker.setOptions(markerOpt);
            const infowindow = new window.google.maps.InfoWindow({
                content: '<p class="map-info-window">Exact location provided after booking.</p>',
            });
            const openInfo = () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            };
            openInfo();
            marker.addListener("click", openInfo);
        }
        return () => {
            if (marker) {
                // marker.removeListener("click", ev => ev);
                marker.setMap(null);
            }
        };
    }, [mapRef, map]);

    return <div className="map" ref={mapRef} />;
};