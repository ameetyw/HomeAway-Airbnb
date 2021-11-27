import { ReviewPreview } from './ReviewPreview';
import { ReactComponent as StarIcon } from '../../assets/imgs/icons/general/icon-star.svg';

export const StayReviews = ({ stay }) => {
    const total = stay.rating.total;
    const categoriesRates = { ...stay.rating };
    delete categoriesRates.total;
    const reviewsToShow = stay.reviews.slice(0, 6);

    const RateBar = ({ category, rating }) => {
        return (
            <div className="review-bar-item flex">
                <div className="topic">{category}</div>
                <div className="rating flex align-center">
                    <div className="rating-bar-container">
                        <span className="rating-bar"
                            style={{ width: `${rating / 5 * 100}%` }}></span>
                    </div>
                    <span className="rate fs12 title">{rating}</span>
                </div>
            </div>
        );
    };

    const getCategoriesRateBars = () => {
        const rateBars = [];
        for (let category in categoriesRates) {
            rateBars.push(<RateBar category={category}
                rating={categoriesRates[category]} />);
        }
        return rateBars;
    };

    return (
        <section className="reviews info-section">
            <h2 className="flex align-center">
                <StarIcon />
                {total} · 3 reviews
            </h2>

            <section className="rating-sum flex wrap">
                {getCategoriesRateBars()}
            </section>

            <section className="latest-reviews flex">
                {reviewsToShow.map(review =>
                    <ReviewPreview key={review.id} review={review} />)}
            </section>

            <button className="show-all-btn">Show all {stay.reviews.length} reviews</button>

        </section>
    );
};