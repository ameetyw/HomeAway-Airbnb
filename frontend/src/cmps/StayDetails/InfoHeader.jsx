import { StayCapacityInfo } from "./StayCapacityInfo";

export const InfoHeader = ({ stay }) => {
    return (
        <div className="info-header sub-section flex align-center space-between">
            <span>
                <h2 className="title">
                    {stay.type} in {stay.propertyType} <span className="line-break">{"\n"}</span>hosted by {stay.host.firstName}
                </h2>
                <StayCapacityInfo stay={stay} />
            </span>
            <img className="host-img" src={stay.host.imgUrl} alt="" />
        </div>
    );
};