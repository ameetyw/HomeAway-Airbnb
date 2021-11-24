import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDates } from '../store/actions/appActions';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerRange = ({ isStay, isOpen, setIsOpen, excludeDates }) => {
    const dispatch = useDispatch();
    const { stayDates } = useSelector(state => state.appModule.currBooking);
    const searchDates = useSelector(state => state.appModule.searchInput.dates);
    const dates = isStay ? stayDates : searchDates;
    const { startDate, endDate } = dates;
    const { isStartOpen, isEndOpen } = isOpen;
    let newDates = { ...dates };

    const handleChange = (newDate, btnType) => {
        console.log('type:',btnType);
        if ((startDate && newDate.getTime() === startDate.getTime()) ||
            (endDate && newDate.getTime() === endDate.getTime())) {
            newDates = { startDate: null, endDate: null };
        } else if (btnType === 'start') {
            newDates.startDate = newDate;
            if (newDate > endDate) newDates.endDate = null;
            setIsOpen({ isStartOpen: false, isEndOpen: true });
        } else {
            if (startDate && newDate < startDate) newDates.startDate = newDate;
            else if (!startDate && newDate > endDate) {
                newDates = { startDate: newDate, endDate: null };
            }
            else newDates.endDate = newDate;
        }
        
        if (isStay) dispatch(setDates({ type: 'stay', dates: newDates }));
        else dispatch(setDates({ type: 'search', dates: newDates }));
        if (!newDates.startDate) setIsOpen({ isStartOpen: true, isEndOpen: false });
    };

    // const handleClick = (btnType) => {
    //     if (btnType === 'start') {
    //         setIsOpen([!isStartOpen, false]);
    //     } else {
    //         setIsOpen([false, !isEndOpen]);
    //     }
    // };

    // const getFormattedDate = (date) => {
    //     return date.toLocaleDateString('en-US', { dateStyle: 'medium' }).split(',')[0];
    // };

    // function getDatesBetweenRangeToExclude(startDate, endDate) {
    //     let dates = [];
    //     let currentDate = startDate;
    //     while (currentDate <= endDate) {
    //         dates.push(new Date (currentDate));
    //         currentDate = currentDate.addDays(1);
    //     }
    //     return dates;
    // }

    return (
        <>
            {/* <span className="date-btns flex align-center">
                    <button className={`date-btn${isStartOpen ? " open" : ""}`} onClick={() => handleClick('start')}>
                        {startDate ? getFormattedDate(startDate) : "Add date"}
                    </button>
                    <button className={`date-btn${isEndOpen ? " open" : ""}`} onClick={() => handleClick('end')}>
                        {endDate ? getFormattedDate(endDate) : "Add date"}
                    </button>
                </span> */}

            {isStartOpen && (
                <DatePicker
                    selectsStart
                    selected={startDate}
                    onSelect={(date) => handleChange(date, 'start')}
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    monthsShown={2}
                    inline
                />
            )}
            {isEndOpen && (
                <DatePicker
                    selectsEnd
                    selected={endDate}
                    onSelect={(date) => handleChange(date, 'end')}
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    monthsShown={2}
                    inline
                />
            )}
        </>
    );
};