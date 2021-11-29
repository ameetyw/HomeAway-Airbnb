import { useSelector, useDispatch } from 'react-redux';
import { setDates } from '../../store/actions/appActions';
import { DatePickerRange } from '../DatePickerRange';
import { DatesBtn } from './DatesBtn';
import { ReactComponent as CloseIcon } from '../../assets/imgs/icons/general/icon-close.svg';

export const ExpandedDatesForm = ({
    isCalendarOpen,
    setCalendarOpen
}) => {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(state =>
        state.appModule.currBooking.stayDates);
    const { unavailableDates } = useSelector(state => state.appModule.currStay);
    const { isStartOpen, isEndOpen } = isCalendarOpen;

    const getDatesHeader = () => {
        if (!startDate || !endDate) return 'Select dates';
        const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
        return `${nights} nights`;
    };

    const getDatesSubheader = () => {
        if (!startDate || !endDate) return "Add your travel dates for exact pricing";
        const start = startDate.toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
        const end = endDate.toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
        return `${start} - ${end}`;
    };

    return (
        <div className={`dates-wrapper${isStartOpen || isEndOpen ? " open" : ""}`} >
            <div className="dates-header flex space-between">
                <span>
                    <h2>{getDatesHeader()}</h2>
                    <p>{getDatesSubheader()}</p>
                </span>
                <span className="dates-btns flex">
                    <DatesBtn title="Check-in" date={startDate}
                        isBtnOpen={isStartOpen}
                        openCalendar={setCalendarOpen}
                        calendarState={{ isStartOpen: true, isEndOpen: false }}>
                        {startDate && <span onClick={() => {
                            dispatch(setDates({ type: 'stay', dates: { startDate: null, endDate: null } }));
                        }}>
                            <CloseIcon />
                        </span>}
                    </DatesBtn>

                    <DatesBtn title="Check-out" date={endDate}
                        isBtnOpen={isEndOpen}
                        openCalendar={setCalendarOpen}
                        calendarState={{ isStartOpen: false, isEndOpen: true }} >
                        {endDate && <span onClick={() => {
                            dispatch(setDates({ type: 'stay', dates: { startDate, endDate: null } }));
                        }}>
                            <CloseIcon />
                        </span>}
                    </DatesBtn>
                </span>
            </div>
            <DatePickerRange
                isStay={true}
                isOpen={isCalendarOpen}
                setIsOpen={setCalendarOpen}
                excludeDates={unavailableDates}
            />
            <span className="dates-ctrl flex justify-end title fs4">
                <button className="clear-dates"
                    onClick={() => dispatch(setDates({ type: 'stay', dates: { startDate: null, endDate: null } }))}>
                    Clear dates
                </button>
                <button className="close-dates"
                    onClick={() => setCalendarOpen({ isStartOpen: false, isEndOpen: false })}>
                    Close
                </button>
            </span>
        </div>
    );
};