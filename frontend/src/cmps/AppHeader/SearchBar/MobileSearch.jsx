import { useState } from 'react';

export const MobileSearch = () => {
    const [isOpen, setOpen] = useState({
        location: false,
        dates: false,
        guests: false,
        isAnyOpen: false
    });

    const openDynBtn = (type) => {
        // falsify all keys, then set 'type' key to true
        const newIsOpen = { ...isOpen };
        Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
        newIsOpen[type] = true;
        newIsOpen.isAnyOpen = true;
        setOpen(newIsOpen);
    };

    const closeAllBtns = () => {
        const newIsOpen = { ...isOpen };
        Object.keys(newIsOpen).forEach(key => newIsOpen[key] = false);
        setOpen(newIsOpen);
    };

    const dynamicBtn = (type, subtitle) => {
        const typeToTitle = type.split('-').join(' ');
        const capitalTitle = typeToTitle.charAt(0).toUpperCase() + typeToTitle.slice(1);
        switch (type) {
            case 'location':
                return <label htmlFor={type}
                    className={`search-btn flex column${isOpen.location ? " open" : ""}`}
                    onClick={() => openDynBtn(type)}>
                    <h4 className="search-title">{capitalTitle}</h4>
                    <input value="" type="text"
                        id={type} name={type} placeholder={subtitle}
                    // onChange={handleChange} 
                    />
                </label>;
            default:
                return <button className={`search-btn ${type} flex column${isOpen[type] ? " open" : ""}`}
                    onClick={() => openDynBtn(type)}>
                    <h4 className="search-title">{capitalTitle}</h4>
                    <p>{subtitle}</p>
                </button>;
        }
    };

    const onSearch = () => {
        console.log('search...');
    };

    return (
        <>
            <form className={`expanded-search`} onSubmit={onSearch}>
                Mobile search form...
                {/* <SearchFormBtn title={"location"} subtitle={"Where are you going?"} /> */}
                {/* {dynamicBtn} */}
                {/* <button className={isExpandedActive ? "active" : ""}>{isExpandedActive && "Search"}</button> */}
            </form>
            <span className={`form-btn-screen${isOpen.isAnyOpen ? " active" : ""}`} onClick={closeAllBtns}></span>
        </>
    );
};