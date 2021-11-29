import { useSelector, useDispatch } from 'react-redux';
import { setGuests } from '../store/actions/appActions';
import { ReactComponent as PlusIcon } from '../assets/imgs/icons/general/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../assets/imgs/icons/general/icon-minus.svg';

export const GuestsPicker = ({ stay }) => {
    const dispatch = useDispatch();
    const { stayGuests } = useSelector(state => state.appModule.currBooking);
    const searchGuests = useSelector(state => state.appModule.searchInput.guests);
    const guests = stay ? stayGuests : searchGuests;
    const petsAllowed = stay ? stay.amenities.some(amenity => amenity.iconName === 'pets') : true;
    // const petsAllowed = false;
    const totalCount = stay ? guests.adults + (guests.children || 0) : null;

    const DynGuestPicker = ({ type, subtitle }) => {
        let isPlusDisabled = false;
        let isMinusDisabled = false;
        if (stay) {
            if (type === 'pets' && !petsAllowed) {
                isPlusDisabled = isMinusDisabled = true;
            }
            if (totalCount === stay.capacity &&
                (type === 'adults' || type === 'children')) isPlusDisabled = true;
        }
        if ((stay && type === 'adults' && guests[type] === 1) ||
            (!guests[type])) isMinusDisabled = true;

        const changeCount = (diff, ev = null) => {
            if ((isPlusDisabled && diff > 0) || (isMinusDisabled && diff < 0)) {
                if (ev) ev.preventDefault();
                return;
            }
            let newGuests = { ...guests };
            if (diff > 0 && type !== 'adults' && !guests.adults) {
                newGuests.adults = 1;
            }
            newGuests[type] = (newGuests[type] || 0) + diff;
            if (!newGuests.adults) newGuests = {};
            if (stay) dispatch(setGuests({ type: 'stay', guests: newGuests }));
            else dispatch(setGuests({ type: 'search', guests: newGuests }));
        };

        return (
            <div className="by-type flex align-center space-between">
                <span className="type flex column">
                    <h3 className="fs16">{type}</h3>
                    <p className="fs14">{subtitle}</p>
                </span>
                <span className="change-count flex align-center">
                    <button className={isMinusDisabled ? "disabled" : ""}
                        onClick={(ev) => changeCount(-1, ev)}>
                        <MinusIcon />
                    </button>
                    {guests[type] || 0}
                    <button className={isPlusDisabled ? "disabled" : ""}
                        onClick={() => changeCount(1)}>
                        <PlusIcon />
                    </button>
                </span>
            </div>
        );
    };

    return (
        <div className="guests-picker">
            <DynGuestPicker type="adults" subtitle="Age 13+" />
            <DynGuestPicker type="children" subtitle="Age 2-12" />
            <DynGuestPicker type="infants" subtitle="Under 2" />
            <DynGuestPicker type="pets" subtitle="" />
            <p className={`bottom${stay ? " stay" : ""}`}>
                {stay ?
                    `This place has a maximum of ${stay.capacity} guests, not including infants.
                    ${petsAllowed ?
                        "If you're bringing more than 2 pets, please let your host know." :
                        "Pets aren't allowed."}`
                    :
                    "If you're lucky enough to have more than 2 pets with you, be sure to let your host know."
                }
            </p>
        </div >
    );
};