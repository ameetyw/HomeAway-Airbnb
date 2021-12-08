import { RatingReviews } from './RatingReviews';
import { ReactComponent as ShareIcon } from '../../assets/imgs/icons/general/icon-share.svg';
import { ReactComponent as HeartIcon } from '../../assets/imgs/icons/general/icon-heart.svg';

export const StayHeader = ({ stay }) => {
    return (
        <section className="stay-header flex column">
            <h1 className="title">{stay.title}</h1>
            <span className="sub-header flex align-center space-between">
                <div className="info flex align-center">
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviewsCount} />
                    <span className="location">{stay.loc.city}, {stay.loc.country}</span>
                </div>
                <div className="actions flex align-center">
                    <button className="share flex align-center">
                        <ShareIcon />
                        Share
                    </button>
                    <button className="save flex align-center">
                        <HeartIcon />
                        Save
                    </button>
                </div>
            </span>

        </section>
    );
};
