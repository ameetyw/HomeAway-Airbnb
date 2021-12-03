import { Link } from 'react-router-dom';
import { RatingReviews } from "../StayDetails/RatingReviews";
import { StayCapacityInfo } from "../StayDetails/StayCapacityInfo";
import { StayAmenityInfo } from "./StayAmenityInfo";
import { ReactComponent as HeartIcon } from '../../assets/imgs/icons/general/icon-heart.svg';

export const StayPreview = ({ stay }) => {
    return (
        <Link to={`/stay/${stay._id}`} target="_blank"
            className="stay-preview sub-section flex">
            <div className="preview-img">
                <img className="full-size" src={stay.imgUrls[0]} alt="" />
                {stay.host.isSuperhost && <span className="superhost fs12">Superhost</span>}
            </div>
            <div className="preview-details flex column space-between">
                <div className="top-info">
                    <span className="header flex align-center space-between">
                        <span className="title-wrapper">
                            <p className="sub-title fs14">{stay.type} in <span>{stay.loc.area || stay.loc.city}</span></p>
                            <p className="main-title fs18">{stay.title}</p>
                        </span>
                        <button className="center-content"><HeartIcon /></button>
                    </span>
                    <span className="sep"></span>
                    <StayCapacityInfo stay={stay} />
                    <StayAmenityInfo amenities={stay.amenities} />
                </div>

                <div className="bottom-info flex space-between">
                    <RatingReviews totalRate={stay.rating.total} totalReviews={stay.reviews.length} />
                    <div className="night-price fs18">
                        <span className="title">${stay.price}</span> / night
                    </div>
                </div>
            </div>
        </Link>
    );
};