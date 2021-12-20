import { useEffect, useState } from "react";

export const PlaceType = ({ filterBy, setFilter, setBtnOpen }) => {
    const [typeBtns, setBtns] = useState([
        { type: 'entire place', desc: 'have a place to yourself' },
        { type: 'private room', desc: 'have your own room and share some common spaces' },
        { type: 'hotel room', desc: 'have a private or shared room in a boutique hotel, hostel, and more' },
        { type: 'shared room', desc: 'stay in a shared space, like a common room' }
    ]);

    useEffect(() => {
        setBtns(prev => prev.map(btn => {
            if (filterBy.type && filterBy.type.includes(btn.type)) btn.isSelected = true;
            else btn.isSelected = false;
            return btn;
        }));
    }, []);

    const isAnySelected = typeBtns.some(btn => btn.isSelected);

    const toggleType = (idx) => {
        const newBtns = [...typeBtns];
        newBtns[idx].isSelected = !typeBtns[idx].isSelected;
        setBtns(newBtns);
    };

    const clearAll = () => {
        const newBtns = typeBtns.map(btn => {
            btn.isSelected = false;
            return btn;
        });
        setBtns(newBtns);
    };

    const saveFilter = () => {
        const types = typeBtns.reduce((accum, btn) => {
            if (btn.isSelected) accum.push(btn.type);
            return accum;
        }, []);
        setFilter(prev => ({ ...prev, type: types }));
        setBtnOpen(prev => ({ ...prev, type: false }));
    };

    return (
        <div className="select-type btn-popover flex column">
            <span className="types-wrapper">
                {typeBtns.map((btn, idx) => <span key={btn.type} className="stay-type flex">
                    <input id={btn.type} type="checkbox"
                        checked={btn.isSelected ? "checked" : ""} onChange={(ev) => toggleType(idx)} />
                    <label htmlFor={btn.type} className="flex column">
                        <h3 className="type-title fs16 capitalize">{btn.type}</h3>
                        <p className="type-desc fs14 capitalize">{btn.desc}</p>
                    </label>
                </span>)}
            </span>
            <span className="ctrl-btns flex align-center space-between">
                <button className={`clear-btn large${isAnySelected ? "" : " disabled"}`}
                    onClick={clearAll}>Clear</button>
                <button className="dark-btn" onClick={saveFilter}>Save</button>
            </span>
        </div>
    );
};