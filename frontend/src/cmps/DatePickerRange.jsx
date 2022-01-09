import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDates } from '../store/actions/appActions';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerRange = ({ isOpen, setIsOpen, isStay, excludeDates }) => {
    const dispatch = useDispatch();
    const { isMobile } = useSelector(state => state.appModule);
    const { stayDates } = useSelector(state => state.appModule.currBooking);
    const searchDates = useSelector(state => state.appModule.searchInput.dates);
    const dates = isStay ? stayDates : searchDates;
    const { startDate, endDate } = dates;
    const { isStartOpen, isEndOpen } = isOpen;
    let newDates = { ...dates };

    const handleChange = (newDate, btnType) => {
        if ((startDate && newDate.getTime() === startDate.getTime()) ||
            (endDate && newDate.getTime() === endDate.getTime())) {
            newDates = { startDate: null, endDate: null };
        } else if (btnType === 'start') {
            newDates.startDate = newDate;
            if (newDate > endDate) newDates.endDate = null;
            setIsOpen({ isStartOpen: false, isEndOpen: true });
        } else {
            if (newDate < startDate) newDates.startDate = newDate;
            else newDates.endDate = newDate;
        }
        if (isStay) dispatch(setDates({ type: 'stay', dates: newDates }));
        else dispatch(setDates({ type: 'search', dates: newDates }));
        if (!newDates.startDate) setIsOpen({ isStartOpen: true, isEndOpen: false });
    };

    return (
        <>
            {isStartOpen && (
                <DatePicker
                    selectsStart
                    selected={startDate}
                    onSelect={(date) => handleChange(date, 'start')}
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    monthsShown={isMobile ? 1 : 2}
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
                    monthsShown={isMobile ? 1 : 2}
                    inline
                />
            )}
        </>
    );
};