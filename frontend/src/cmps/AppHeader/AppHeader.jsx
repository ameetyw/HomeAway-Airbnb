// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar/SearchBar';
import { UserMenuBtn } from './UserMenuBtn';
import WhiteLogo from '../../assets/imgs/logo-white.svg';
import RedLogo from '../../assets/imgs/logo-red.svg';
import { SearchForm } from './SearchBar/SearchForm';
import { MobileSearch } from './SearchBar/MobileSearch';

export const AppHeader = () => {
    const { pathname } = useLocation();
    const layoutType = pathname.includes('/stay/') ? " stay" : (pathname.includes('/explore/') ? " explore" : "");
    const { isHomeTop, isSearchExpand } = useSelector(state => state.appModule);

    return (
        <header className={`content-wrapper${layoutType}${isHomeTop ? " home-top" : ""}${isSearchExpand ? " expanded" : ""}`}>
            <div className="header-content flex column">
                <div className="top flex align-center">
                    <Link to="/" className="logo-wrapper flex align-center">
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
        </header>
    );
};