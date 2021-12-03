import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMapObj } from "./GoogleMapObj";

const API_KEY = 'AIzaSyDm1kVff1tOF1Jvd-Uxba4C__Ux4bt3R8I';

export const GoogleMap = ({ zoom, center, isMobile }) => {
    return <Wrapper apiKey={API_KEY}>
        <GoogleMapObj center={center} zoom={zoom} isMobile={isMobile} />
    </Wrapper>;
};