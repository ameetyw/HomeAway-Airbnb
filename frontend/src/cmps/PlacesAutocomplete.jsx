import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDestination } from '../store/actions/appActions';
import { loadScript } from '../services/util.service';
import { ReactComponent as CloseIcon } from '../assets/imgs/icons/general/icon-close.svg';

const API_KEY = 'AIzaSyDm1kVff1tOF1Jvd-Uxba4C__Ux4bt3R8I';
const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

export const PlacesAutocomplete = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    const [query, setQuery] = useState('');
    const [isShowBtn, setShowBtn] = useState(false);

    const autoCompleteRef = useRef(null);
    let autoComplete = null;
    const autoCompleteOptions = {
        types: ['(cities)'],
        fields: ['name'],
        sessionToken,
    };

    useEffect(() => {
        if (!loaded) {
            loadScript('google-places', scriptUrl, {
                async: true, defer: true,
                callback: () => { setLoaded(true); }
            });
        } else if (!autoComplete) {
            autoComplete = new window.google.maps.places.Autocomplete(
                autoCompleteRef.current,
                autoCompleteOptions
            );
            autoComplete.addListener('place_changed', handlePlaceSelect);
        }
    }, [loaded]);

    useEffect(() => {
        if (query) setShowBtn(true);
        else setShowBtn(false);
    }, [query]);

    const onChangeQuery = (ev) => {
        if (!sessionToken) {
            setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
        }
        setQuery(ev.target.value);
    };

    const handlePlaceSelect = () => {
        const addressObject = autoComplete.getPlace();
        setQuery(addressObject.name);
        dispatch(setDestination(addressObject.name));
        setShowBtn(false);
        setSessionToken(null);
    };

    const deleteSession = (ev) => {
        ev.preventDefault();
        dispatch(setDestination(''));
        setSessionToken(null);
        autoCompleteRef.current.blur();
        setTimeout(() => {
            setQuery('');
            autoCompleteRef.current.focus();
        }, 10);
    };

    return (
        <>
            {/* <div className="location-search"> */}
            <input
                ref={autoCompleteRef}
                type="text"
                id="location-input"
                name="location-input"
                className="location-search-input "
                placeholder="Where are you going?"
                value={query}
                onChange={onChangeQuery}
                onFocus={() => { if (query) setShowBtn(true); }}
            // onBlur={() => { setShowBtn(false); }}
            />
            {isShowBtn ? <button className="location-clear-btn center-content" onClick={deleteSession}><CloseIcon /></button> : ''}
            {/* </div> */}
        </>
    );
};