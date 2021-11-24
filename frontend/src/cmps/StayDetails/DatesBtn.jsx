export const DatesBtn = ({ title, date, isBtnOpen, openCalendar, calendarState, children }) => {

    const getFormattedDate = () => {
        return date.toLocaleDateString('en-IE', { day: "numeric", month: "numeric", year: "numeric" });
    };

    return (
        <button className={`dates flex align-center space-between${isBtnOpen ? " open" : ""}`}
            onClick={() => { openCalendar(calendarState); }}>
            <span>
                <h4 className="title">{title}</h4>
                <span className={`input fs14${!date ? " placeholder" : ""}`}>
                    {date ? getFormattedDate() : "Add date"}
                </span>
            </span>
            {children}
        </button>
    );
}