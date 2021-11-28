import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStay, saveBooking } from '../store/actions/appActions';
import { StayHeader } from '../cmps/StayDetails/StayHeader';
import { StayInfo } from '../cmps/StayDetails/StayInfo';
import { BookingForm } from '../cmps/StayDetails/BookingForm';
import { StayReviews } from '../cmps/StayDetails/StayReviews';
import { StayLocation } from '../cmps/StayDetails/StayLocation';
import { ReactComponent as MoreIcon } from '../assets/imgs/icons/general/icon-dots.svg';
import { HostedBy } from '../cmps/StayDetails/HostedBy';

export const StayDetails = () => {
    const dispatch = useDispatch();
    const stayId = useParams().id;
    const stay = useSelector(state => state.appModule.currStay);
    const emptyBooking = {
        stayId,
        stayDates: { startDate: null, endDate: null },
        stayGuests: { adults: 1 }
    };
    const tempStay = {
        "_id": "3a",
        "title": "Private Balcony Room ❤ 1m walk from Rothschild Blv",
        "imgUrls": [
            "https://a0.muscache.com/im/pictures/17e9d170-5dee-414b-a605-c5c69ab8b01c.jpg?im_w=960",
            "https://a0.muscache.com/im/pictures/miso/Hosting-35848582/original/bf8205bf-65e8-4d5c-9743-05ceaf722b45.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/1855c07c-84e3-44d7-974a-c370fbea50c3.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/d6372da1-ea65-4602-a099-fcdbbb7c7eae.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/055a1c9e-3d8e-48fb-a944-ac8283e6b5eb.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/908f5125-d906-45ce-916e-96f5db4268ba.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/d8366e13-2fae-4b77-b95d-311726ccdd14.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-35848582/original/6f209d62-4021-46ce-80c3-d03fc016efa8.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/73fae0fc-d708-4c9a-9bb8-e8cfd80ec222.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/56e274cb-953c-437b-9a09-cc6e14bc52c7.jpg?im_w=720",
        ],
        "price": 62.00,
        "cleaning": 40,
        "description": `חדר עם מרפסת פרטי מעוצב, מרוהט ומאובזר להשכרה לטווח קצר או ארוך בתוך מיני גסטהאוס בלב תל אביב דקה הליכה מרוטשילד. שירותים, מקלחת, ומטבח משותפים. ניתן לפנות לשאלות נוספות.
        
        Large spacious room with private balcony in a boutique guesthouse with a rooftop located in the very heart of the city, right next to the famous Rothschild boulevard, and walking distance to most major sites in Tel Aviv as well as a short walk to the beach.
        
        **The space**
        *Shared rooftop
        *Queen size bed
        *Private Balcony
        *Fresh linen & towels
        *Complimentary Toiletries
        *working Desk
        *TV with local channels and Chromecast
        * Full AC & Heater Unit
        *Map With Local Recommendations
        *Hair dryer, Iron & Plug adapters
        * 24h Self check in
        *Fast Wifi
        *Fully equip kitchen
        *Filtered cold or Hot Water
        *Coffee/Tea
        *1 Min From Rothschild Blv
        
        **Guest access**
        Guests will have full access to a fully equip kitchen with a comfortable dining area to make a tasty breakfast in the morning. In addition guests will have access to the balcony to enjoy a beer in the evenings as well as a small library with books on Tel aviv to help plan your day.
        
        In addition guests will now have full access to our lovely rooftop to enjoy the evening with a glass of wine :)
        
        **Other things to note**
        Due to Covid 19 I would like to share some of the extra cleaning measures we are taking now to keep our guests safe and healthy:
        
        *All sheets, towels and rugs are washed in high temperatures (90°).
        *All surfaces, handles and buttons in shared space are cleaned on a daily basis with special anti bacteria spray.
        *The room is thoroughly aired out for a few hours before check in.
        *cleaning team will wear disposable masks and gloves at all times.
        *Hand sanitizer napkins supplied in all rooms.`,
        "type": "Private room",
        "propertyType": "hostel",
        "capacity": 2,
        "bedrooms": 1,
        "beds": 1,
        "baths": 2,
        "bathType": "shared",
        "sleep": [
            {
                "room": "bedroom 1", "beds": [
                    { "type": "queen bed", "quantity": 1 },
                    { "type": "single bed", "quantity": 1 },
                ]
            },
            {
                "room": "living room", "beds": [
                    { "type": "sofa bed", "quantity": 1 },
                    { "type": "couch", "quantity": 1 },
                ]
            },
        ],
        "amenities": [
            { "type": "bathroom", "amenity": "Shampoo", "iconName": "shampoo" },
            { "type": "bathroom", "amenity": "Body soap", "iconName": "soap" },
            { "type": "bathroom", "amenity": "Shower gel", "iconName": "soap" },
            { "type": "bathroom", "amenity": "Hot water", "iconName": "hotwater" },
            { "type": "bathroom", "amenity": "Hair dryer", "iconName": "hairdryer", "displayScore": 19 },
            { "type": "bathroom", "amenity": "Conditioner", "iconName": "shampoo" },
            { "type": "bathroom", "amenity": "Bath tub", "iconName": "bathtub", "displayScore": 14 },
            { "type": "bedroom+laundry", "amenity": "Essentials", "iconName": "essentials", "desc": "Towels, bed sheets, soap, toilet paper, and pillows" },
            { "type": "bedroom+laundry", "amenity": "Bed linens", "iconName": "linens" },
            { "type": "bedroom+laundry", "amenity": "Dryer", "iconName": "dryer", "displayScore": 11 },
            { "type": "bedroom+laundry", "amenity": "Room-darkening shades", "iconName": "shades" },
            { "type": "bedroom+laundry", "amenity": "Washer", "iconName": "washer", "displayScore": 10 },
            { "type": "entertainment", "amenity": "Exercise equipment", "iconName": "exercise", "displayScore": 23 },
            { "type": "entertainment", "amenity": "Toys", "iconName": "toys" },
            { "type": "entertainment", "amenity": "TV", "iconName": "tv", "displayScore": 8 },
            { "type": "heating+cooling", "amenity": "Air conditioning", "iconName": "ac", "displayScore": 12 },
            { "type": "heating+cooling", "amenity": "Indoor fireplace", "iconName": "firepit", "displayScore": 16 },
            { "type": "home-safety", "amenity": "Carbon monoxide alarm", "iconName": "cmoalarm" },
            { "type": "home-safety", "amenity": "Fire extinguisher", "iconName": "fireext" },
            { "type": "home-safety", "amenity": "First aid kit", "iconName": "firstaid" },
            { "type": "home-safety", "amenity": "Smoke alarm", "iconName": "smokealarm" },
            { "type": "internet+office", "amenity": "Dedicated workspace", "iconName": "workspace", "desc": "A desk or table with a chair and space for a laptop.", "displayScore": 20 },
            { "type": "internet+office", "amenity": "Wifi", "iconName": "wifi", "desc": "Available throughout the listing.", "displayScore": 3 },
            { "type": "kitchen+dining", "amenity": "Barbecue utensils", "iconName": "bbq", "desc": "Grill, charcoal, bamboo skewers/iron skewers, etc." },
            { "type": "kitchen+dining", "amenity": "Cooking basics", "iconName": "kitchen", "desc": "Pots and pans, oil, salt and pepper." },
            { "type": "kitchen+dining", "amenity": "Dining table", "iconName": "dining" },
            { "type": "kitchen+dining", "amenity": "Dishwasher", "iconName": "washer" },
            { "type": "kitchen+dining", "amenity": "Freezer", "iconName": "freezer" },
            { "type": "kitchen+dining", "amenity": "Kitchen", "iconName": "kitchen", "desc": "Space where guests can cook their own meals.", "displayScore": 2 },
            { "type": "kitchen+dining", "amenity": "Refrigerator", "iconName": "freezer", "displayScore": 21 },
            { "type": "outdoor", "amenity": "BBQ grill", "iconName": "bbq", "displayScore": 15 },
            { "type": "outdoor", "amenity": "Fire pit", "iconName": "firepit", "displayScore": 18 },
            { "type": "outdoor", "amenity": "Beach essentials", "iconName": "beach", "desc": "Beach towels, umbrella, beach blanket, snorkeling gear." },
            { "type": "outdoor", "amenity": "Outdoor dining area", "iconName": "outdoordining", "displayScore": 17 },
            { "type": "outdoor", "amenity": "Outdoor furniture", "iconName": "outdoordining" },
            { "type": "outdoor", "amenity": "Patio or balcony", "iconName": "patio", "displayScore": 13 },
            { "type": "features+services", "amenity": "Beach access", "iconName": "beach", "desc": "Guests can enjoy a nearby beach.", "displayScore": 1 },
            { "type": "features+services", "amenity": "Private entrance", "iconName": "door", "desc": "Separate street or building entrance." },
            { "type": "features+services", "amenity": "Elevator", "iconName": "elevator", "desc": "The home or building has an elevator that’s at least 52 inches deep and a doorway at least 32 inches wide.", "displayScore": 9 },
            { "type": "features+services", "amenity": "Free parking", "iconName": "car", "displayScore": 5 },
            { "type": "features+services", "amenity": "Gym", "iconName": "exercise", "displayScore": 22 },
            { "type": "features+services", "amenity": "Hot tub", "iconName": "hottub", "displayScore": 7 },
            { "type": "features+services", "amenity": "Paid parking", "iconName": "car", "displayScore": 24 },
            { "type": "features+services", "amenity": "Pool", "iconName": "pool", "displayScore": 6 },
            { "type": "features+services", "amenity": "Pets allowed", "iconName": "pets", "displayScore": 4 },
            { "type": "features+services", "amenity": "Self check-in", "iconName": "door", "desc": "Check yourself in with the lockbox." },
            { "type": "features+services", "amenity": "Entire home", "iconName": "home", "desc": "You'll have the place to yourself." },
        ],
        "unavailableDates": [
            { "from": "2021-11-10", "to": "2021-11-13" },
            { "from": "2021-11-28", "to": "2021-12-04" },
        ],
        "host": {
            "_id": "51399391",
            "firstName": "Tomer",
            "memberSince": "2013-02-14T21:00:00.000Z",
            "imgUrl": "https://randomuser.me/api/portraits/men/58.jpg",
            "about": "Hi, my name is Tomer, and welcome to Tel Aviv! It is a beautiful city and I am sure you'll love it! I am more than happy to answer any questions or request you might have and will do so as fast as possible. Looking forward to hearing from you! I wish you a pleasant stay in Tel Aviv :) Tomer",
            "duringStay": "I commit to help with every request or question you may encounter upon staying at my apartment.",
            "reviewsCount": 54,
            "isVerified": true,
            "isSuperhost": true,
        },
        "loc": {
            "country": "Israel",
            "countryCode": "ISR",
            "city": "Tel Aviv-Yafo",
            "address": "Nahalat Binyamin St 77",
            "zip": "",
            "lat": 32.06196364406076,
            "lng": 34.77239418059386,
            "desc": "The apartment is in an excellent location! It is situated in one of the main streets of Tel Aviv, adjacent to Dizengoff Str, at which a variety of supermarkets, gyms, coffee shops, bars, restaurants, convenience stores, banks and ATM's, drugstores, bicycle rentals, hair dressers and much more can be found. It is also just a 1 minute walk away from the beach! Even though the apartment is in the city centre it is situated in a quiet side-street, so the noise levels are not of any annoyance and the nights are peacefully quiet.",
            "getAround": "The apartment is only 2 minutes walk from the next Bus station. There are also long distance Bus stations near by, bicycle rentals and taxis."
        },
        "reviews": [
            {
                "id": "r101",
                "txt": "Tomer is a great host. Always available for any questions. \nThe location was perfect, close to the beach. There’s a public parking right by the apartment. \nEverything was perfect! \nThank you Tomer!!",
                "rate": 4,
                "createdAt": "2021-08-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Karen",
                    "imgUrl": "https://randomuser.me/api/portraits/women/93.jpg",
                },
            },
            {
                "id": "r102",
                "txt": "Tomer is as good as they come. The apartment is great and the location is even better. Tomer is super responsive and fixed any issues that came up immediately. Highly recommend.",
                "rate": 5,
                "createdAt": "2021-07-30T21:00:00.000Z",
                "by": {
                    "_id": "u103",
                    "firstName": "Tal",
                    "imgUrl": "https://randomuser.me/api/portraits/men/98.jpg"
                },
            },
            {
                "id": "r103",
                "txt": "We arrive to TLV and Tomer was just great! He helped us with all our questions like where we should eat at night? to Where is the best sunset location!? Tomer was very responsive when we needed (24/7). The apartment was actually 1 min for the beach !! Thanks for helping us having a great time (:",
                "rate": 4,
                "createdAt": "2021-07-06T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Jordan",
                    "imgUrl": "https://randomuser.me/api/portraits/men/11.jpg",
                },
            },
            {
                "id": "r104",
                "txt": "It was 5 stars! Great location, nice and clean apartment with all the necessary amenities.",
                "rate": 4,
                "createdAt": "2021-06-27T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Eliana",
                    "imgUrl": "https://randomuser.me/api/portraits/women/15.jpg",
                },
            },
            {
                "id": "r105",
                "txt": "This place is in the best location in Tel Aviv. Very near the sea and the promenade. Also near restaurants and bars. The apartment is dark and the photos appear to have been taken years ago. The apartment is not “luxury” as the furniture, pillows, rugs are old. Does not feel fresh and clean. Tomer is great. Very responsive and nice. The apt. Has all the amenities. Nice, fully equipped kitchen, washer and dryer.",
                "rate": 4,
                "createdAt": "2021-06-12T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Danielle",
                },
            },
            {
                "id": "r106",
                "txt": "The place was spacious and clean and very close to the beach. It had everything we needed and was nicely decorated. Great stay!",
                "rate": 4,
                "createdAt": "2021-05-21T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Jackie",
                    "imgUrl": "https://randomuser.me/api/portraits/women/81.jpg",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
            {
                "id": "r107",
                "txt": "I was very happy to stay at Tomer's apartment. The location is excellent. It's across the street from the beachfront and it easily beats out all the hotels in the neighborhood. You get a much better space and the real estate is just as good. This is one of the best in Tel Aviv.",
                "rate": 4,
                "createdAt": "2021-04-14T21:00:00.000Z",
                "by": {
                    "_id": "u102",
                    "firstName": "Tomer",
                },
            },
        ],
        "rating": {
            "total": 4.33,
            "cleanliness": 4.3,
            "accuracy": 4.8,
            "communication": 4.7,
            "location": 4.9,
            "check-in": 4.7,
            "value": 4.3
        },
    };

    useEffect(() => {
        if (stay && stay._id === stayId) document.title = `HomeAway: ${stay.title}`;
        else {
            dispatch(setStay(tempStay));
            // dispatch(saveBooking(emptyBooking));
        }
    }, [stay._id]);
    //useEffect for stayId..

    if (stay._id !== stayId) return <div className="loading">loading...</div>;

    const galleryUrls = stay.imgUrls.slice(0, 5);
    return (
        <section className="stay stay-details content-wrapper">
            <StayHeader stay={stay} />

            <section className="gallery">
                {galleryUrls.map((imgUrl, idx) => (
                    <Link key={`img${idx + 1}`} to=""><img src={imgUrl} alt="" /></Link>
                ))}
                <button className="show-all flex align-center">
                    <MoreIcon />
                    Show all photos
                </button>
            </section>

            <section className="stay-info-wrapper flex space-between">
                <StayInfo stay={stay} />
                <BookingForm stay={stay} />
            </section>

            <StayReviews rates={stay.rating} reviews={stay.reviews} />
            <StayLocation location={stay.loc} />
            <HostedBy host={stay.host} />

        </section>
    );
};