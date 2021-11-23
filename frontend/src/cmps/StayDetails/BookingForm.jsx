import { RatingReviews } from './RatingReviews';
export const BookingForm = ({ stay }) => {

    return (
        <div className="booking-form">
            <div className="form-header flex align-center space-between">
                <div className="night-price">
                    <span>${stay.price}</span> / night
                </div>
                <div className="info-sum flex">
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviews.length} />
                </div>
            </div>
            
        </div>
    );
};