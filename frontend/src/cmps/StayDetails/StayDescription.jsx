import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isContentOverflown } from '../../services/util.service';
import { ShowMoreBtn } from '../ShowMoreBtn';

export const StayDescription = ({ desc }) => {

    const boldSep = /\*\*(.*?)\*\*/g;
    const boldedDesc = desc.replace(boldSep, '<span class="title">$1</span>');
    const widthRef = useRef(null);
    const [isDescOverflow, setDescOverflow] = useState(false);
    const { currScreenSize } = useSelector(state => state.appModule);

    const test = `Experience living in a typical TLV building, in a newly furnished, top design, comfortable and friendly apartment.

    **The space**
    Welcome to your exclusive vacation apartment in Tel Aviv. This recently renovated **luxury** flat is on one of the most popular boulevards in the city`;
    const boldTest = test.replace(boldSep, '<span class="title">$1</span>');

    useEffect(() => {
        const elDesc = widthRef.current;
        if (elDesc && isContentOverflown(elDesc)) {
            if (!isDescOverflow) setDescOverflow(true);
        } else if (isDescOverflow) setDescOverflow(false);
    }, [widthRef.current, currScreenSize]);

    return (
        <div className="description sub-section">
            <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldTest }} />
            {/* <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldedSumm }} /> */}
            {isDescOverflow && <ShowMoreBtn />}
        </div>
    );
};