export const InfoHeader = ({ stay }) => {
    return (
        <div className="info-header info-section flex align-center space-between">
            <span>
                {/* <h2 className="title flex">{"Entire rental unit hosted by Oded & Solomon"}</h2> */}
                <h2 className="title">
                    {stay.type} in {stay.propertyType} <span className="line-break">{"\n"}</span>hosted by {stay.host.firstName}
                </h2>
                <span className="info-header-subtitle flex align-center wrap">
                    <p>{stay.capacity} guest{stay.capacity > 1 && "s"}</p>
                    <p>{stay.bedrooms} bedroom{stay.bedrooms > 1 && "s"}</p>
                    <p>{stay.beds} bed{stay.beds > 1 && "s"}</p>
                    <p>{stay.baths}{stay.bathType === "shared" && " shared"} bath{stay.baths > 1 && "s"}</p>
                </span>
            </span>
            <img className="host-img" src={stay.host.imgUrl} alt="" />
        </div>
    );
};