import { Link } from 'react-router-dom';

export const Popular = () => {
    const destinations = [
        { city: "Tel Aviv-Yafo", country: "Israel" },
        { city: "London", country: "United Kingdom" },
        { city: "New York", country: "United States" },
        { city: "Paris", country: "France" },
        { city: "Amsterdam", country: "Netherlands" },
        { city: "Los Angeles", country: "United States" },
        { city: "Hong Kong", country: "China" },
        { city: "Barcelona", country: "Spain" },
    ];

    return (
        <section className="popular places">
            <h2>Popular Destinations</h2>
            <div className="dest-list">
                {destinations.map((destination, idx) => (
                    <Link to={`/search/${destination.city.split(' ').join('-')}/homes`} key={destination.city} className="dest-item flex">
                        <img src={`imgs/home-popular/${idx + 1}.jpg`} alt="" />
                        <span className="name">
                            <h4 className="city">{destination.city}</h4>
                            <p className="country">{destination.country}</p>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};