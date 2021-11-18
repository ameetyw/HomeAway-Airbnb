import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/imgs/icons/general/icon-arrow.svg';

export const StayInfo = ({ stay }) => {
    const boldSep = /\*\*(.*?)\*\*/gm;
    const boldedSumm = stay.summary.replace(boldSep, '<span class="subtitle">$1</span>');
    const widthRef = useRef(null);
    const [isSummOverflow, setSummOverflow] = useState(false);

    const test = `Experience living in a typical TLV building, in a newly furnished, top design, comfortable and friendly apartment.

    <span class="subtitle">The space</span>
    Welcome to your exclusive vacation apartment in Tel Aviv. This recently renovated luxury flat is on one of the most popular boulevards in the city`;

    useEffect(() => {
        const elSumm = widthRef.current;
        console.log('summ', elSumm);
        handleResize();
        window.addEventListener('resize', handleResize);

        function handleResize() {
            const isResizeOverflow = isOverflown(elSumm);
            if (isResizeOverflow !== isSummOverflow) setSummOverflow(isResizeOverflow);

            function isOverflown({ clientWidth, clientHeight, scrollWidth, scrollHeight }) {
                return scrollHeight > clientHeight || scrollWidth > clientWidth;
            };
        }
    }, [isSummOverflow]);

    return (
        <section className="stay-info">
            <div className="info-header info-section flex align-center space-between">
                <span>
                    <h2 className="title">{stay.type} in {stay.propertyType} hosted by {stay.host.firstName}</h2>
                    <span className="info-header-subtitle flex align-center">
                        <p>{stay.capacity} guest{stay.capacity > 1 && "s"}</p>
                        <p>{stay.bedrooms} bedroom{stay.bedrooms > 1 && "s"}</p>
                        <p>{stay.beds} bed{stay.beds > 1 && "s"}</p>
                        <p>{stay.baths}{stay.bathType === "shared" && " shared"} bath{stay.baths > 1 && "s"}</p>
                    </span>
                </span>
                <img src={stay.host.imgUrl} alt="" />
            </div>

            <div className="features info-section">features</div>

            <div className="description info-section">
                <p ref={widthRef} dangerouslySetInnerHTML={{ __html: test }} />
                {/* <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldedSumm }} /> */}
                {isSummOverflow && <button className="flex align-center title">
                    Show more
                    <ArrowIcon /></button>}
            </div>
            <div className="amenities info-section">
                <h2 class="title">What this place offers</h2>
                <div className="list">yo</div>
            </div>

        </section>
    );
};