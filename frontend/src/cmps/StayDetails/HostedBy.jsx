import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as StarIcon } from '../../assets/imgs/icons/general/icon-star.svg';
import { ReactComponent as VerifiedIcon } from '../../assets/imgs/icons/general/icon-verified.svg';
import { ReactComponent as SuperIcon } from '../../assets/imgs/icons/general/icon-medal.svg';
import GenericAvatar from '../../assets/imgs/generic-avatar.png';

// "host": {
//     "_id": "51399391",
//     "firstName": "Tomer",
//     "memberSince": "2013-02-14T21:00:00.000Z",
//     "imgUrl": "https://randomuser.me/api/portraits/men/58.jpg",
//     "about": "Hi, my name is Tomer, and welcome to Tel Aviv! It is a beautiful city and I am sure you'll love it! I am more than happy to answer any questions or request you might have and will do so as fast as possible. Looking forward to hearing from you! I wish you a pleasant stay in Tel Aviv :) Tomer",
//     "duringStay": "I commit to help with every request or question you may encounter upon staying at my apartment.",
//     "reviewsCount": 54,
//     "isVerified": true,
//     "isSuperHost": true,
// }

export const HostedBy = ({ host }) => {
    const { currScreenSize } = useSelector(state => state.appModule);
    const heightRef = useRef(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (heightRef.current) {
            const { scrollHeight, clientHeight } = heightRef.current;
            setStyle({ marginBottom: `${scrollHeight - clientHeight}px` });
        }
    }, [heightRef.current, currScreenSize]);

    const AboutHost = ({ about }) => {
        const aboutHost = [<p>{about.substring(0, 180)}</p>];
        if (about.substring(180)) {
            aboutHost.push(
                <button>... <span className="read-more title">read more</span></button>
            );
        }
        return aboutHost;
    };

    return (
        <section className="hosted-by sub-section">
            <div className="host-header flex align-center">
                <span className="host-img">
                    <img className="full-size" src={host.imgUrl || GenericAvatar} alt="" />
                </span>
                <span className="host-header-info flex column">
                    <h4 className="title fs22">Hosted by {host.firstName}</h4>
                    <p className="date fs14">
                        Joined in {new Date(host.memberSince).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </span>
            </div>

            <div ref={heightRef} className="host-content flex wrap" style={style}>
                <div>
                    <div className="host-icons flex wrap align-center">
                        {host.reviewsCount &&
                            <span className="icon">
                                <StarIcon />
                                {host.reviewsCount} Reviews
                            </span>}
                        {host.isVerified &&
                            <span className="icon">
                                <VerifiedIcon />
                                Identity verified
                            </span>}
                        {host.isSuperhost &&
                            <span className="icon">
                                <SuperIcon />
                                Superhost
                            </span>}
                    </div>
                    <div className="info-text">
                        {host.about && <div className="about-host">
                            <AboutHost about={host.about} />
                        </div>}

                        {host.duringStay && <div className="during-stay">
                            <h3 className="title fs16">During your stay</h3>
                            <p>{host.duringStay}</p>
                        </div>}

                        {host.isSuperhost && <div className="superhost">
                            <h3 className="title fs16">{host.firstName} is a Superhost</h3>
                            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        </div>}
                    </div>
                </div>
                <div className="extra-info">
                    <div className="host-stats">
                        <p>Languages: English, עברית</p>
                        <p>Response rate: 100%</p>
                        <p>Response time: within an hour</p>
                    </div>
                    <button className="contact show-all-btn">Contact Host</button>
                    <p className="warning fs12">To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
                </div>
            </div>

        </section>
    );
};