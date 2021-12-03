import { ReactComponent as StarIcon } from '../../assets/imgs/icons/general/icon-star.svg';

export const RatingReviews = ({ totalRate, totalReviews }) => {
    return (
        <span className="rate-rev flex align-center">
            <span className="rating flex align-center">
                <StarIcon />
                <p>{totalRate}</p>
            </span>
            <button className="review-count">({totalReviews} review{totalReviews > 1 && 's'})</button>
        </span>
    );
};