export const StayFormPricing = ({ nightPrice, nightCount, cleaningFee }) => {
    const total = nightPrice * nightCount;
    const service = Math.round(total * 0.14);

    const PriceSection = ({ title, price }) => {
        return (
            <div className="sub-price align-center flex space-between">
                <span className="price-title">{title}</span>
                <span className="price">${price.toLocaleString('en-US')}</span>
            </div>
        );
    };

    return (
        <div className="stay-pricing">
            <p className="fs14">You won't be charged yet</p>
            <PriceSection price={total}
                title={`$${nightPrice} x ${nightCount} nights`} />
            {cleaningFee && <PriceSection title="Cleaning fee" price={cleaningFee} />}
            <PriceSection title="Service fee" price={service} />
            <span className="sep"></span>
            <PriceSection title="Total" price={total + service + (cleaningFee || 0)} />
        </div>
    );
}