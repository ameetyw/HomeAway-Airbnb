export function getGuestsTitle(guestsDetails) {
    if (!Object.keys(guestsDetails).length) {
        return <p className="subtitle placeholder">Add guests</p>;
    }
    const { adults, children, infants, pets } = guestsDetails;
    const totalGuests = adults + (children || 0);
    let guestsTitle = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
    guestsTitle += infants ? `, ${infants} infant${infants > 1 ? "s" : ""}` : "";
    guestsTitle += pets ? `, ${pets} pet${pets > 1 ? "s" : ""}` : "";
    return <p className="subtitle">{guestsTitle}</p>;
}