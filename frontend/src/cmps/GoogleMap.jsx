import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = 'AIzaSyDm1kVff1tOF1Jvd-Uxba4C__Ux4bt3R8I';

export const GoogleMap = ({ zoom, center, isMobile }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    let marker = null;

    useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, { zoom, center, maxZoom: 17, mapTypeControl: false }));
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
            if (!isMobile) openInfo();
            marker.addListener("click", openInfo);
        }
        return () => {
            if (marker) {
                // marker.removeListener("click", ev => ev);
                marker.setMap(null);
            }
        };
    }, [mapRef, map]);

    {/* something about status... */ }
    return <Wrapper apiKey={API_KEY}>
        <div className="map" ref={mapRef} />;
    </Wrapper>;
};