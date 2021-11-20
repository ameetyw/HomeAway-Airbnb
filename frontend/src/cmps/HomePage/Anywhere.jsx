import { Link } from 'react-router-dom';
import { importImgs } from '../../services/util.service';

export const Anywhere = () => {
    const places = [
        { title: 'Outdoor getaways', imgName: 'outdoor' },
        { title: 'Unique stays', imgName: 'unique' },
        { title: 'Entire homes', imgName: 'home' },
        { title: 'Pets allowed', imgName: 'pets' },
    ];
    const images = importImgs(require.context('../../assets/imgs/HomePage/Anywhere', false, /\.(png|jpe?g|svg)$/));
    
    return (
        <section className="places anywhere">
            <h2>Live anywhere</h2>
            <div className="dest-list">
                {places.map(place => (
                    <Link to="/explore/" key={place.imgName} className="dest-item">
                        <img src={images[place.imgName].default} alt="" />
                        <h4 className="title">{place.title}</h4>
                    </Link>
                ))}
            </div>
        </section>
    );
};