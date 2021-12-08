import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setHomeTop, setSearchExpand } from '../store/actions/appActions';
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service';
import { Popular } from '../cmps/HomePage/Popular';
import { Anywhere } from '../cmps/HomePage/Anywhere';
import HostImg from '../assets/imgs/HomePage/host.jpg';
import { ReactComponent as HeartIcon } from '../assets/imgs/icons/general/icon-heart.svg';

export const HomePage = () => {
    const dispatch = useDispatch();
    const isTop = useRef(true);
    const docTitle = "HomeAway: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences";
    let winScroll;

    useEffect(() => {
        // <p className="flex align-center" style={{ gap: '7px' }}>
        //     <HeartIcon style={{ height: '18px', width: '18px', fill:'#ff385c' }} />
        //     Saved to your saving test wishlist</p>
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        listenToScroll();
        document.title = docTitle;
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
            dispatch(setHomeTop(false));
        };
    }, []);

    const listenToScroll = () => {
        winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (!winScroll) {
            dispatch(setSearchExpand(true));
            dispatch(setHomeTop(true));
            isTop.current = true;
        } else if (isTop.current) {
            dispatch(setSearchExpand(false));
            dispatch(setHomeTop(false));
            isTop.current = false;
        }
    };

    return (
        <div className="home content-wrapper">
            <section className="hero">
                <span className="backdrop"></span>
                <div className="welcome-msg flex column align-center text-center full-size justify-end">
                    <h2 className="title">Not sure where to go? Perfect.</h2>
                    <button className="center-content">
                        <span>I'm flexible</span>
                    </button>
                </div>
            </section>
            <Popular />
            <Anywhere />
            <section className="host">
                <img className="full-size" src={HostImg} alt="" />
                <div className="host-msg flex column align-start">
                    <h2>Try hosting</h2>
                    <p>Earn extra income and unlock new opportunities by sharing your space.</p>
                    <button>Learn more</button>
                </div>
            </section>
        </div>
    );
};