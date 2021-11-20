import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerRange = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const onChange = (date, currBtn) => {
        console.log(currBtn, date);
        let nextBtn;
        if (currBtn === startRef) {
            setStartDate(date);
            nextBtn = endRef;
        } else {
            setEndDate(date);
            nextBtn = startRef;
        }
        // currBtn.current.setBlur();
        nextBtn.current.setFocus();
    };

    return (
        <div className="date-picker-wrapper">
            <div className="date-picker-range">
                <DatePicker
                    ref={startRef}
                    selected={startDate}
                    onChange={(date) => { onChange(date, startRef); }}
                    // onChange={(date) => setStartDate(date)}
                    selectsStart
                    monthsShown={2}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="Add dates"
                />
                <DatePicker
                    ref={endRef}
                    selected={endDate}
                    onChange={(date) => { onChange(date, endRef); }}
                    selectsEnd
                    monthsShown={2}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="Add dates"
                />

                {/* <DatePicker
                    renderCustomHeader={({
                        monthDate,
                        customHeaderCount,
                        decreaseMonth,
                        increaseMonth,
                    }) => (
                        <div>
                            <button
                                aria-label="Previous Month"
                                className={"react-datepicker__navigation react-datepicker__navigation--previous"}
                                style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                                onClick={decreaseMonth}>
                                <span
                                    className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"}>
                                    {"<"}
                                </span>
                            </button>
                            <span className="react-datepicker__current-month">
                                {monthDate.toLocaleString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                            <button
                                aria-label="Next Month"
                                className={"react-datepicker__navigation react-datepicker__navigation--next"}
                                style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                                onClick={increaseMonth}>
                                <span
                                    className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"}>
                                    {">"}
                                </span>
                            </button>
                        </div>
                    )}
                    className="date-picker-class"
                    selected={startDate}
                    onChange={onChange}
                    monthsShown={2}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange
                    inline /> */}
            </div>
        </div>
    );
};