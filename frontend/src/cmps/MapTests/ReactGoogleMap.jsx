import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps } from "recompose";
// const google = window.google;

const KEY = 'AIzaSyDm1kVff1tOF1Jvd-Uxba4C__Ux4bt3R8I';

export const ReactGoogleMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }), withScriptjs, withGoogleMap
)(props => <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
</GoogleMap>);