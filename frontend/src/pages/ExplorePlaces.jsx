import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import queryString from 'query-string';
import { stayService } from '../services/stay.service';
import { StayPreview } from '../cmps/ExplorePlaces/StayPreview';
import { ReactComponent as MapIcon } from '../assets/imgs/icons/general/icon-map.svg';
import { ReactComponent as ListIcon } from '../assets/imgs/icons/general/icon-list.svg';

export const ExplorePlaces = () => {
    const searchUrl = useLocation().search;
    const searchParams = queryString.parse(searchUrl);
    // const searchParams = new URLSearchParams(searchUrl);
    // console.log('searchUrl:', searchUrl);

    const [isListView, setListView] = useState(true);
    const [stays, setStays] = useState([]);
    const listRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(async () => {
        document.title = "HomeAway: Explore stays";
        console.log('searchParams:', searchParams);
        const queryStays = await stayService.query();
        setStays(queryStays);
    }, []);

    const toggleView = () => {
        listRef.current.classList.toggle('active');
        mapRef.current.classList.toggle('active');
        setListView(prevState => !prevState);
    };

    return (
        <section className="explore main-content content-wrapper">
            <div className="explore-header-wrapper">
                <section className="explore-header">
                    <h2>header</h2>
                </section>
            </div>

            <section className="explore-content flex">
                <section ref={listRef} className="explore-listings active">
                    {stays.map(stay => <StayPreview key={stay._id} stay={stay} />)}
                </section>

                <section ref={mapRef} className="explore-map">
                    <h2>map</h2>
                </section>

                <button className="switch-view fs14 flex align-center"
                    onClick={toggleView}>
                    <span>
                        Show {isListView ? "map" : "list"}
                    </span>
                    {isListView ? <MapIcon /> : <ListIcon />}
                </button>
            </section>
        </section>
    );
};