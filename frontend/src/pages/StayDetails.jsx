import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStay, setCurrScreenSize } from '../store/actions/appActions';
import { stayService } from '../services/stay.service';
import { showErrorMsg } from '../services/event-bus.service';

import { StayHeader } from '../cmps/StayDetails/StayHeader';
import { StayGalleryPreview } from '../cmps/StayDetails/StayGalleryPreview';
import { StayInfo } from '../cmps/StayDetails/StayInfo';
import { BookingForm } from '../cmps/StayDetails/BookingForm';
import { StayReviews } from '../cmps/StayDetails/StayReviews';
import { StayLocation } from '../cmps/StayDetails/StayLocation';
import { HostedBy } from '../cmps/StayDetails/HostedBy';

export const StayDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stayId = useParams().id;
    const stay = useSelector(state => state.appModule.currStay);
    const { currScreenSize } = useSelector(state => state.appModule);
    const [isMobile, setIsMobile] = useState(false);
    const mobileBreakpoint = 727;

    // const emptyBooking = {
    //     stayId,
    //     stayDates: { startDate: null, endDate: null },
    //     stayGuests: { adults: 1 }
    // };

    useEffect(async () => {
        // if (Object.keys(stay).length) {
        if (Object.keys(stay).length && stay._id === stayId) {
            document.title = `HomeAway: ${stay.title}`;
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            console.log('resize listener on in stay details');
            return () => {
                window.removeEventListener('resize', checkScreenSize);
                console.log('resize listener off in stay details');
            };
        }
        else {
            try {
                const newStay = await stayService.getById(stayId);
                // console.log('newStay', newStay);
                dispatch(setStay(newStay));
                // dispatch(saveBooking(emptyBooking));
            } catch (err) {
                console.log('had issue getting stay:', err);
                navigate('/oops');
                showErrorMsg(err.message);
            }
        }
    }, [stay._id]);

    useEffect(() => {
        if (currScreenSize && currScreenSize < mobileBreakpoint) {
            if (!isMobile) setIsMobile(true);
        }
        else if (isMobile) setIsMobile(false);
    }, [currScreenSize]);

    const checkScreenSize = () => {
        const screenWidth = window.screen.width;
        const innerWidth = window.innerWidth;
        dispatch(setCurrScreenSize(screenWidth < innerWidth ? screenWidth : innerWidth));
    };

    if (stay._id !== stayId) return <div className="loading">loading...</div>;

    return (
        <section className="stay stay-details content-wrapper">
            <StayHeader stay={stay} />

            <StayGalleryPreview stayImgUrls={stay.imgUrls} isMobile={isMobile} />

            <section className="split-stay-info-wrapper flex space-between">
                <StayInfo stay={stay} isMobile={isMobile} />
                <BookingForm stay={stay} isMobile={isMobile} />
            </section>

            <StayReviews rates={stay.rating} reviews={stay.reviews} />
            {!isMobile && <StayLocation location={stay.loc} />}
            <HostedBy host={stay.host} />
            {isMobile && <span className="form-bottom"></span>}
        </section>
    );
};