import { useEffect, useState } from 'react';
import { PlaceType } from './PlaceType';
import { ReactComponent as DownArrow } from '../../assets/imgs/icons/general/icon-arrowhead-down.svg';
import { ReactComponent as UpArrow } from '../../assets/imgs/icons/general/icon-arrowhead-up.svg';
import { ReactComponent as FilterIcon } from '../../assets/imgs/icons/general/icon-filter.svg';

export const ExploreHeader = ({ filterBy, setFilter }) => {
    const [filterCount, setFilterCount] = useState(0);
    const [isBtnOpen, setBtnOpen] = useState({
        price: false,
        type: false,
    });
    const isAnyOpen = (isBtnOpen.price || isBtnOpen.type);

    const [isBtnSelected, setBtnSelected] = useState([
        { type: 'free cancellation', isSelected: false },
        { type: 'beach access', isSelected: false },
        { type: 'wifi', isSelected: false },
        { type: 'kitchen', isSelected: false },
        { type: 'air conditioning', isSelected: false },
        { type: 'washer', isSelected: false },
        { type: 'free parking', isSelected: false },
        { type: 'dryer', isSelected: false },
        { type: 'pool', isSelected: false },
        { type: 'self check-in', isSelected: false },
        { type: 'dedicated workspace', isSelected: false },
        { type: 'gym', isSelected: false }
    ]);

    useEffect(() => {
        const count = getFilterCount();
        setFilterCount(count);

        function getFilterCount() {
            let count = 0;
            const filter = { ...filterBy };
            delete filter.type;
            delete filter.minPrice;
            delete filter.maxPrice;
            for (const key in filter) {
                if (typeof filter[key] === 'object') {
                    count += filter[key].length;
                } else count++;
            }
            return count;
        };
    }, [filterBy]);

    const toggleBtnOpen = (type) => {
        setBtnOpen(prevState => ({ ...prevState, [type]: !prevState[type] }));
    };

    const toggleBtnSelected = (type) => {
        const typeIdx = isBtnSelected.findIndex(btn => btn.type === type);
        const newIsSelected = [...isBtnSelected];
        newIsSelected[typeIdx].isSelected = !isBtnSelected[typeIdx].isSelected;

        let amenities = filterBy.amenities || [];
        if (newIsSelected[typeIdx].isSelected) amenities.push(type);
        else amenities = amenities.filter(amenity => amenity !== type);

        setBtnSelected(newIsSelected);
        setFilter(prev => ({ ...prev, amenities }));
    };

    const closeBtns = () => {
        setBtnOpen({ price: false, type: false });
    };

    const LeftBtn = ({ type, children }) => {
        let title;
        let isSet = true;
        if (type === 'type') {
            const count = filterBy.type ? filterBy.type.length : null;
            if (count) {
                title = filterBy.type[0] + (count > 1 ? ` +${count - 1}` : "");
            } else {
                isSet = false;
                title = "type of place";
            }
        } else {
            const { minPrice, maxPrice } = filterBy;
            if (minPrice) {
                if (maxPrice) title = `$${minPrice} - $${maxPrice}`;
                else title = `$${minPrice}+`;
            } else if (maxPrice) title = `up to ${maxPrice}`;
            else {
                isSet = false;
                title = "price";
            }
        }

        return <span className="btn-wrapper">
            <button className={`header-btn${isSet ? " selected" : ""}`}
                onClick={() => toggleBtnOpen(type)}>
                <span className="capitalize">{title}</span>
                {isBtnOpen[type] ? <UpArrow /> : <DownArrow />}
            </button>
            {children}
        </span>;
    };

    const RightBtn = ({ btn }) => {
        return <button className={`header-btn${btn.isSelected ? " selected" : ""}`}
            onClick={() => toggleBtnSelected(btn.type)}>
            <span className="capitalize">{btn.type}</span>
        </button>;
    };

    return (
        <section className="explore-header flex">
            <section className={`left flex align-center${isAnyOpen ? " open" : ""}`}>
                <LeftBtn type="price" >
                    {isBtnOpen.price && <></>}
                </LeftBtn>

                <LeftBtn type="type" >
                    {isBtnOpen.type &&
                        <PlaceType filterBy={filterBy} setFilter={setFilter} setBtnOpen={setBtnOpen} />}
                </LeftBtn>
                <span className={`screen${isAnyOpen ? " open" : ""}`}
                    onClick={closeBtns}></span>
            </section>

            <section className="right flex">
                <span className="filters-btns flex wrap">
                    {isBtnSelected.map(btn => <RightBtn key={btn.type} btn={btn} />)}
                </span>
                <button className={`filter-btn header-btn flex align-center${filterCount ? " selected" : ""}`}>
                    <FilterIcon />
                    Filters
                    {filterCount ? <span className="filter-count">{filterCount}</span> : ''}
                </button>
            </section>
        </section>
    );
};