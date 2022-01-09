import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isContentOverflown } from '../../services/util.service';
import { ShowMoreBtn } from '../ShowMoreBtn';

export const StayDescription = ({ desc }) => {

    const boldSep = /\*\*(.*?)\*\*/g;
    const boldedDesc = desc.replace(boldSep, '<span class="title">$1</span>');
    const widthRef = useRef(null);
    const [isDescOverflow, setDescOverflow] = useState(false);
    const { screenSize } = useSelector(state => state.appModule);

    useEffect(() => {
        const elDesc = widthRef.current;
        if (elDesc && isContentOverflown(elDesc)) {
            if (!isDescOverflow) setDescOverflow(true);
        } else if (isDescOverflow) setDescOverflow(false);
    }, [widthRef.current, screenSize]);

    return (
        <div className="description sub-section">
            <p ref={widthRef} dangerouslySetInnerHTML={{ __html: boldedDesc }} />
            {/* {isDescOverflow && <ShowMoreBtn />} */}
        </div>
    );
};