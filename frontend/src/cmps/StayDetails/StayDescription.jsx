import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/imgs/icons/general/icon-arrow.svg';

export const StayDescription = ({ desc }) => {

    const boldSep = /\*\*(.*?)\*\*/g;
    const boldedDesc = desc.replace(boldSep, '<span class="title">$1</span>');
    const widthRef = useRef(null);
    const [isDescOverflow, setDescOverflow] = useState(false);

    const test = `Experience living in a typical TLV building, in a newly furnished, top design, comfortable and friendly apartment.

    **The space**
    Welcome to your exclusive vacation apartment in Tel Aviv. This recently renovated **luxury** flat is on one of the most popular boulevards in the city`;
    const boldTest = test.replace(boldSep, '<span class="title">$1</span>');

    useEffect(() => {
        const elDesc = widthRef.current;
        handleResize();
        window.addEventListener('resize', handleResize);

        function handleResize() {
            const isResizeOverflow = isOverflown(elDesc);
            if (isResizeOverflow !== isDescOverflow) setDescOverflow(isResizeOverflow);

            function isOverflown({ clientWidth, clientHeight, scrollWidth, scrollHeight }) {
                return scrollHeight > clientHeight || scrollWidth > clientWidth;
            };
        }
    }, [isDescOverflow]);

    return (
        <div className="description info-section">
            <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldTest }} />
            {/* <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldedSumm }} /> */}
            {isDescOverflow && <button className="show-more flex align-center title">
                Show more
                <ArrowIcon /></button>}
        </div>
    );
};