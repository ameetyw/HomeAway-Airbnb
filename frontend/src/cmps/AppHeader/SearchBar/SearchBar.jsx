import { ReactComponent as MagnifyGlassIcon } from '../../../assets/imgs/icons/header/icon-magnify-glass.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchExpand } from '../../../store/actions/appActions';

export const SearchBar = ({ isSearchExpand, isHomeTop }) => {
    const dispatch = useDispatch();

    return (
        <div className="search-bar center-content">
            <button
                className={"simple-search-bar flex align-center" +
                    `${!isSearchExpand ? " active" : ""}` +
                    `${isHomeTop ? " home-top" : ""}`}
                onClick={() => { dispatch(setSearchExpand(true)); }}>
                <span className="magnify-glass-wrapper center-content"><MagnifyGlassIcon /></span>
            </button>
            <span className={`explore${isSearchExpand ? " active" : ""}` +
                `${isHomeTop ? " home-top" : ""}`}>Explore</span>

        </div>
    );
};