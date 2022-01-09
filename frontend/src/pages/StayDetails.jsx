import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStay } from '../store/actions/appActions';
import { stayService } from '../services/stay.service';
import { showErrorMsg } from '../services/event-bus.service';
import { StayHeader } from '../cmps/StayDetails/StayHeader';
import { StayGalleryPreview } from '../cmps/StayDetails/StayGalleryPreview';
import { StayInfo } from '../cmps/StayDetails/StayInfo';
import { BookingForm } from '../cmps/StayDetails/BookingForm';
import { StayReviews } from '../cmps/StayDetails/StayReviews';
import { StayLocation } from '../cmps/StayDetails/StayLocation';
import { HostedBy } from '../cmps/StayDetails/HostedBy';
import { Loader } from '../cmps/Loader';

export const StayDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stayId = useParams().id;
    const stay = useSelector(state => state.appModule.currStay);
    const { isMobile } = useSelector(state => state.appModule);
    const reviewsRef = useRef(null);

    useEffect(() => {
        if (Object.keys(stay).length && stay._id === stayId) {
            document.title = `HomeAway: ${stay.title}`;
        }
        else getStay();

        async function getStay() {
            try {
                const newStay = await stayService.getById(stayId);
                dispatch(setStay(newStay));
            } catch (err) {
                console.log('had issue getting stay:', err);
                showErrorMsg(err.message);
                navigate('/oops');
            }
        }
    }, [stay._id]);

    const scrollToReviews = () => {
        reviewsRef.current.scrollIntoView();
    };

    if (stay._id !== stayId) return <Loader />;

    return (
        <section className="stay stay-details content-wrapper">
            <StayHeader stay={stay} scrollToReviews={scrollToReviews} />

            <StayGalleryPreview stayImgUrls={stay.imgUrls} isMobile={isMobile} />

            <section className="split-stay-info-wrapper flex space-between">
                <StayInfo stay={stay} isMobile={isMobile} />
                <BookingForm stay={stay} isMobile={isMobile} scrollToReviews={scrollToReviews} />
            </section>

            <span className="reviews-anchor" ref={reviewsRef}></span>
            <StayReviews rates={stay.rating} reviews={stay.reviews} />
            {!isMobile && <StayLocation location={stay.loc} />}
            <HostedBy host={stay.host} />
            {isMobile && <span className="form-bottom"></span>}
        </section>
    );
};