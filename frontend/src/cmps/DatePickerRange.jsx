import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDates } from '../store/actions/appActions';

export const DatePickerRange = ({ isOpen, setIsOpen, isStay, excludeDates }) => {
    const dispatch = useDispatch();
    const { isMobile } = useSelector(state => state.pageModule);
    const { stayDates } = useSelector(state => state.appModule.currBooking);
    const { dates: searchDates } = useSelector(state => state.appModule.searchInput);
    const { startDate, endDate } = isStay ? stayDates : searchDates;
    const { isStartOpen, isEndOpen } = isOpen;

    const handleChange = (newDate, btnType) => {
        let newDates = { startDate, endDate };

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