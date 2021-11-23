import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerRange = (props) => {
    const { isOpen, setIsOpen, dates, setDates, excludeDates } = props;
    const [startDate, endDate] = dates;
    const [isStartOpen, isEndOpen] = isOpen;

    const handleChange = (newDate, btnType) => {
        if ((startDate && newDate.getTime() === startDate.getTime()) ||
            (endDate && newDate.getTime() === endDate.getTime())) {
            setDates([null, null]);
            setIsOpen([true, false]);
        } else if (btnType === 'start') {
            if (newDate > endDate) setDates([newDate, null]);
            else setDates([newDate, endDate]);
            setIsOpen([false, true]);
        } else {
            if (newDate < startDate) setDates([newDate, endDate]);
            else if (!startDate && newDate > endDate) setDates([newDate, null]);
            else setDates([startDate, newDate]);
            if (!startDate) setIsOpen([true, false]);
        }
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