import { useState, useEffect, useRef } from 'react';
import { ShowMoreBtn } from '../ShowMoreBtn';
import GenericAvatar from '../../assets/imgs/generic-avatar.png';

export const ReviewPreview = ({ review, isContentOverflown }) => {
    const widthRefEl = useRef(null);
    const [isShowMore, setShowMore] = useState(false);

    useEffect(() => {
        if (widthRefEl.current) setShowMore(isContentOverflown(widthRefEl.current))
    }, [widthRefEl.current])


    return (
        <div className="review-preview flex column">
            <div className="reviewer flex align-center">
                <span className="user-img">
                    <img className="full-size" src={review.by.imgUrl || GenericAvatar} alt="" />
                </span>
                <span className="reviewer-info flex column">
                    <h4 className="name title fs16">{review.by.firstName}</h4>
                    <p className="date fs14">
                        {new Date(review.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </span>
            </div>
            <p ref={widthRefEl} className="review-content">{review.txt}</p>
            {isShowMore && <ShowMoreBtn />}
        </div>
    );
};