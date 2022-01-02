import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadScript } from '../../services/util.service';
import { setHomeTop, setSearchExpand, setGoogleScriptLoad } from '../../store/actions/appActions';
import { SearchBar } from './SearchBar/SearchBar';
import { UserMenuBtn } from './UserMenuBtn';
import WhiteLogo from '../../assets/imgs/logo-white.svg';
import RedLogo from '../../assets/imgs/logo-red.svg';
import { SearchForm } from './SearchBar/SearchForm';
// import { MobileSearch } from './SearchBar/MobileSearch';
import { UserMsg } from '../UserMsg';

const GOOGLE_KEY = 'AIzaSyDm1kVff1tOF1Jvd-Uxba4C__Ux4bt3R8I';
const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;

export const AppHeader = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const pageType = pathname.includes('/stay') ? " stay" : (pathname.includes('/explore') ? " explore" : "");
    const { isHomeTop, isSearchExpand, isGoogleScriptLoaded } = useSelector(state => state.appModule);

    useEffect(() => {
        if (pageType) {
            dispatch(setHomeTop(false));
            dispatch(setSearchExpand(false));
        }
    }, [pageType, isHomeTop, dispatch]);

    useEffect(() => {
        if (!isGoogleScriptLoaded) loadScript('google-maps', scriptUrl, {
            async: true,
            callback: () => { dispatch(setGoogleScriptLoad(true)); }
        });
    }, [isGoogleScriptLoaded, dispatch]);

    useEffect(() => {
        if (isSearchExpand && !isHomeTop) {
            window.addEventListener('keydown', isEsc);
        }
        return () => {
            window.removeEventListener('keydown', ev => ev);
        };

        function isEsc(ev) {
            if (ev.key === 'Escape') dispatch(setSearchExpand(false));
        };
    }, [isSearchExpand, isHomeTop, dispatch]);

    const isScrollTop = () => {
        if (!pageType) window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className={`content-wrapper${pageType}${isHomeTop ? " home-top" : ""}${isSearchExpand ? " expanded" : ""}`}>
            <div className="header-content flex column">
                <div className="top flex align-center">
                    <Link to="/" className="logo-wrapper flex align-center" onClick={isScrollTop}>
                        <img className="logo" src={isHomeTop ? WhiteLogo : RedLogo} alt="" />
                        <h1 className="name">HomeAway</h1>
                    </Link>

                    <SearchBar isHomeTop={isHomeTop} isSearchExpand={isSearchExpand} />

                    <nav className="user-nav">
                        <Link to="/">Become a Host</Link>
                        <UserMenuBtn />
                    </nav>
                </div>
                <SearchForm isHomeTop={isHomeTop} isSearchExpand={isSearchExpand} />
                {/* <MobileSearch /> */}
            </div>

            {/* <nav className="mobile-nav flex align-center">
                <p>I am mobile nav</p>
            </nav> */}

            <UserMsg />
        </header>
    );
};