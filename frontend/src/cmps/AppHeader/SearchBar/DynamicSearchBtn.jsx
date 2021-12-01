import { PlacesAutocomplete } from "../../PlacesAutocomplete";

export const DynamicSearchBtn = ({ type, subtitle, isOpen, children, toggleIsOpen }) => {
    const typeToTitle = type.split('-').join(' ');
    const capitalTitle = typeToTitle.charAt(0).toUpperCase() + typeToTitle.slice(1);
    const isPlaceholder = (!subtitle || subtitle.startsWith('Add') ||
        subtitle.startsWith('Where')) ? 'placeholder' : '';

    const onToggleBtn = (ev) => {
        const correctedType = (type === 'check-in') ? 'startDate' :
            ((type === 'check-out') ? 'endDate' : type);
        toggleIsOpen(ev, correctedType);
    };

    switch (type) {
        case 'location':
            return (
                <span className={`search-sub-btn ${type}-wrapper flex align-center`}>
                    <label htmlFor="location-input"
                        className={`${type} flex column${isOpen ? " open" : ""}`}
                        onClick={(ev) => toggleIsOpen(ev, type)}>
                        <h4 className="search-title">{capitalTitle}</h4>
                        <PlacesAutocomplete />
                        {/* <input className={isPlaceholder} value="" type="text"
                            id={type} name={type} placeholder={subtitle}
                        onChange={handleChange} 
                        /> */}
                    </label>
                </span>
            );
        default:
            const newType = (type === 'guests') ? type : 'dates';
            return (
                <span className={`search-sub-btn ${newType}${isOpen ? " open" : ""} flex align-center`}>
                    <span className={`flex column`} onClick={onToggleBtn}>
                        <h4 className="search-title">{capitalTitle}</h4>
                        <p className={isPlaceholder}>{subtitle}</p>
                    </span>
                    {children}
                </span>
            );
    }
};