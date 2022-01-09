import { useLocation } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/imgs/icons/general/icon-star.svg';

export const RatingReviews = ({ totalRate, totalReviews, scrollToReviews }) => {
    const { pathname } = useLocation();
    console.log(pathname)
    return (
        <span className="rate-rev flex align-center">
            <span className="rating flex align-center">
                <StarIcon />
                <p>{totalRate}</p>
            </span>
            <button className="review-count" onClick={scrollToReviews}>
                ({totalReviews} review{totalReviews > 1 && 's'})
            </button>
        </span>
    );
};