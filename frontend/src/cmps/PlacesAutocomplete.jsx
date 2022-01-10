import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDestination } from '../store/actions/appActions';
import { ReactComponent as CloseIcon } from '../assets/imgs/icons/general/icon-close.svg';

export const PlacesAutocomplete = () => {
    const dispatch = useDispatch();
    const { isGoogleScriptLoaded } = useSelector(state => state.pageModule);
    const [sessionToken, setSessionToken] = useState(null);
    const [query, setQuery] = useState('');
    const [isShowBtn, setShowBtn] = useState(false);
    const autoCompleteRef = useRef(null);
    let autoComplete = null;
    const autoCompleteOptions = {
        types: ['geocode'],
        fields: ['name'],
        sessionToken,
    };

    useEffect(() => {
        if (isGoogleScriptLoaded && !autoComplete) {
            autoComplete = new window.google.maps.places.Autocomplete(
                autoCompleteRef.current,
                autoCompleteOptions
            );
            autoComplete.addListener('place_changed', handlePlaceSelect);
        }
    }, [isGoogleScriptLoaded]);

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
            />
            {isShowBtn ? <button className="location-clear-btn center-content" onClick={deleteSession}><CloseIcon /></button> : ''}
        </>
    );
};