import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as GlobeIcon } from '../assets/imgs/icons/general/icon-globe.svg';
import { ReactComponent as FacebookIcon } from '../assets/imgs/icons/social/icon-facebook.svg';
import { ReactComponent as LinkedinIcon } from '../assets/imgs/icons/social/icon-linkedin.svg';
import { ReactComponent as GithubIcon } from '../assets/imgs/icons/social/icon-github.svg';

export const AppFooter = () => {
    const { pathname } = useLocation();
    const layoutType = pathname.includes('/stay/') ? " stay" : (pathname.includes('/explore') ? " explore" : "");

    return (
        <footer className={`content-wrapper${layoutType}`}>
            <div className="footer-content flex align-center">
                <span className="footer-start flex align-center">
                    <span className="rights flex align-center">
                        <p>© 2021 HomeAway, Inc.</p>
                        <span className="sep">·</span>
                    </span>
                    <span className="links flex align-center">
                        <a href="https://www.linkedin.com/in/amiteew" target="_blank">About</a>
                        <span className="sep">·</span>
                        <Link to="">Login</Link>
                        <span className="sep">·</span>
                        <Link to="">Become a host</Link>
                    </span>
                </span>
                <span className="footer-end flex align-center">
                    <button className="lang flex align-center">
                        <GlobeIcon />
                        <p>English (US)</p>
                    </button>
                    <button className="curr flex align-center">
                        <h5>$</h5>
                        <p>USD</p>
                    </button>
                    <span className="social flex align-center">
                        <Link to=""><FacebookIcon /></Link>
                        <a href="https://www.linkedin.com/in/amiteew" target="_blank"><LinkedinIcon /></a>
                        <a href="https://github.com/amiteew/HomeAway" target="_blank"><GithubIcon /></a>
                    </span>
                </span>
            </div>
        </footer>
    );
};