import { useSelector } from 'react-redux';
import { ReactComponent as BlankAvatarIcon } from '../../assets/imgs/icons/header/icon-avatar.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/imgs/icons/header/icon-menu-hamburger.svg';

export const UserMenuBtn = () => {
    const { loggedInUser } = useSelector(state => state.appModule);
    return (
        <button className="user-menu-btn flex align-center">
            <MenuBurgerIcon className="menu-icon" />
            {loggedInUser ?
                <>{
                    loggedInUser.imgUrl ?
                        <img className="avatar-img" src={loggedInUser.imgUrl} alt="" /> :
                        <span className="avatar-img center-content">{loggedInUser.initials}</span>
                }</> :
                <BlankAvatarIcon className="avatar-img" />}
            {loggedInUser && loggedInUser.newNotifications &&
                <span className="notifications center-content">{loggedInUser.newNotifications.length}</span>}
        </button>
    );
};