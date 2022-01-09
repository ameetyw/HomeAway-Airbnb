import { Link } from 'react-router-dom';
import { ReactComponent as MoreIcon } from '../../assets/imgs/icons/general/icon-dots.svg';

export const StayGalleryPreview = ({ stayImgUrls, isMobile }) => {
    return (
        <section className={`gallery${isMobile ? " full" : ""}`}>
            {isMobile ?
                <>
                    <Link key={`img1`} to=""><img src={stayImgUrls[0]} alt="" /></Link>
                </> :
                <>
                    {stayImgUrls.slice(0, 5).map((imgUrl, idx) => (
                        <Link key={`img${idx + 1}`} to=""><img src={imgUrl} alt="" /></Link>
                    ))}
                    {/* <button className="show-all flex align-center">
                        <MoreIcon />
                        Show all photos
                    </button> */}
                </>}
        </section>
    );
};
