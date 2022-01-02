import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LoaderSVG } from '../assets/imgs/loader.svg';

export const Loader = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => navigate('/oops'), 5000);
        return () => { clearTimeout(timeoutId); };
    }, []);

    return <div className="loader full-screen center-content"><LoaderSVG /></div>;
};