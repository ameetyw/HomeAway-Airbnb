import { useState, useEffect, useRef } from 'react';
import { isContentOverflown } from '../../services/util.service';
import { ShowMoreBtn } from '../ShowMoreBtn';

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
            const isResizeOverflow = isContentOverflown(elDesc);
            if (isResizeOverflow !== isDescOverflow) setDescOverflow(isResizeOverflow);
        }
    }, [isDescOverflow]);

    return (
        <div className="description info-section">
            <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldTest }} />
            {/* <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldedSumm }} /> */}
            {isDescOverflow && <ShowMoreBtn />}
        </div>
    );
};