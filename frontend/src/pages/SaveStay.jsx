import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';

export const SaveStay = () => {
    const [pos, setPos] = useState({});
    const [stayInput, handleChange, setFields] = useForm({
        title: '',
        imgUrls: ['', '', '', '', ''],
        price: 0,
        cleaning: 0,
        description: '',
        type: '',
        propertyType: '',
        capacity: 0,
        bedrooms: 0,
        beds: 0,
        baths: 0,
        bathType: '',
        reviewsCount: 0,
        rating: {
            total: 0,
            cleanliness: 0,
            accuracy: 0,
            communication: 0,
            location: 0,
            "check-in": 0,
            value: 0
        },
        loc: {
            country: '',
            city: '',
            pos: { lat: 0, lng: 0 },
            desc: '',
            getAround: ''
        }
    });

    const addImgUrl = (ev) => {
        setFields(prevFields => ({
            ...prevFields,
            imgUrls: [...prevFields.imgUrls, '']
        }));
    };

    useEffect(() => {
        if (pos.lat && pos.lng) {
            setFields(prevFields => ({
                ...prevFields,
                loc: { ...prevFields.loc, pos }
            }));
        }
    }, [pos]);

    const handleChangePos = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setPos(prevPos => ({ ...prevPos, [field]: value }));
    };

    const saveStay = (ev) => {
        ev.preventDefault();
        console.log('save:', stayInput);
        // redirect to new page..
    };

    return (
        <section className="save-stay">
            <h1>Save Stay</h1>
            <form onSubmit={saveStay}>
                Title:<input type="text" value={stayInput.title} name="title" onChange={handleChange} />
                imgUrls:{stayInput.imgUrls.map((imgUrl, idx) =>
                    <input type="text" name="imgUrls" value={imgUrl} data-key={idx} required={idx < 5}
                        placeholder="enter url" onChange={handleChange} key={`data-${idx + 1}`} />)}
                <button type="button" onClick={addImgUrl}>[+]</button>
                Night price: <input type="number" name="price" value={stayInput.price} onChange={handleChange} />
                Cleaning fee: <input type="number" name="cleaning" value={stayInput.cleaning} onChange={handleChange} />
                Description: <textarea name="description" value={stayInput.description} onChange={handleChange} />
                Stay type: <select name="type" value={stayInput.type} onChange={handleChange} >
                    <option hidden selected>Select one...</option>
                    <option value="Entire place">Entire place</option>
                    <option value="Private room">Private room</option>
                    <option value="Shared room">Shared room</option>
                    <option value="Hotel room">Hotel room</option>
                </select>
                Property type: <select name="propertyType" value={stayInput.propertyType} onChange={handleChange} >
                    <option hidden selected>Select one...</option>
                    <option value="rental unit">rental unit</option>
                    <option value="residential home">residential home</option>
                    <option value="condo">condo</option>
                    <option value="cottage">cottage</option>
                    <option value="loft">loft</option>
                    <option value="boutique hotel">boutique hotel</option>
                    <option value="bed and breakfast">bed and breakfast</option>
                    <option value="hostel">hostel</option>
                    <option value="hotel">hotel</option>
                </select>
                Capacity: <input type="number" name="capacity" value={stayInput.capacity} onChange={handleChange} />
                Bedrooms: <input type="number" name="bedrooms" value={stayInput.bedrooms} onChange={handleChange} />
                Beds: <input type="number" name="beds" value={stayInput.beds} onChange={handleChange} />
                Baths: <input type="number" name="baths" value={stayInput.baths} onChange={handleChange} />
                Bath type: <select name="bathType" value={stayInput.bathType} onChange={handleChange} >
                    <option hidden selected>Select one...</option>
                    <option value="private">private</option>
                    <option value="shared">shared</option>
                </select>
                Reviews #: <input type="number" name="reviewsCount" value={stayInput.reviewsCount} onChange={handleChange} />
                Total rating: <input type="number" name="rating" data-key="total"
                    value={stayInput.rating.total} onChange={handleChange} />
                Cleanliness: <input type="number" name="rating" data-key="cleanliness"
                    value={stayInput.rating.cleanliness} onChange={handleChange} />
                Accuracy: <input type="number" name="rating" data-key="accuracy"
                    value={stayInput.rating.accuracy} onChange={handleChange} />
                Communication: <input type="number" name="rating" data-key="communication"
                    value={stayInput.rating.communication} onChange={handleChange} />
                Location: <input type="number" name="rating" data-key="location"
                    value={stayInput.rating.location} onChange={handleChange} />
                Check-in: <input type="number" name="rating" data-key="check-in"
                    value={stayInput.rating["check-in"]} onChange={handleChange} />
                Value: <input type="number" name="rating" data-key="value"
                    value={stayInput.rating.value} onChange={handleChange} />
                <h3>Location</h3>
                Country: <input type="text" name="loc" data-key="country"
                    value={stayInput.loc.country} onChange={handleChange} />
                City: <input type="text" name="loc" data-key="city"
                    value={stayInput.loc.city} onChange={handleChange} />
                Desc: <input type="text" name="loc" data-key="desc"
                    value={stayInput.loc.desc} onChange={handleChange} />
                Get around: <input type="text" name="loc" data-key="getAround"
                    value={stayInput.loc.getAround} onChange={handleChange} />
                Pos:
                lat- <input type="number" name="lat"
                    value={stayInput.loc.pos.lat}
                    onChange={handleChangePos} />
                lng- <input type="number" name="lng"
                    value={stayInput.loc.pos.lng}
                    onChange={handleChangePos} />

                <br />
                <button>Save</button>
            </form>
        </section>
    );
};