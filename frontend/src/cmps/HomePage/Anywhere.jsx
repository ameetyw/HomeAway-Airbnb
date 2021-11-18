import { Link } from 'react-router-dom';
import Outdoor from '../../assets/imgs/HomePage/outdoor.jpg';
import Unique from '../../assets/imgs/HomePage/unique.jpg';
import Home from '../../assets/imgs/HomePage/home.jpg';
import Pets from '../../assets/imgs/HomePage/pets.jpg';

export const Anywhere = () => {
    const places = [
        { title: "Outdoor getaways", img: Outdoor },
        { title: "Unique stays", img: Unique },
        { title: "Entire homes", img: Home },
        { title: "Pets allowed", img: Pets },
    ];
    return (
        <section className="places anywhere">
            <h2>Live anywhere</h2>
            <div className="dest-list">
                {places.map(place => (
                    <Link to="/explore/" key={place.title} className="dest-item">
                        <img src={place.img} alt="" />
                        <h4>{place.title}</h4>
                    </Link>
                ))}
            </div>
        </section>
    );
};