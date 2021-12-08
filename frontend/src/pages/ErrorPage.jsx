import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorGif from '../assets/imgs/error-page.gif';

export const ErrorPage = () => {
    const navigate = useNavigate();
    const [secs, setSecs] = useState(7);

    useEffect(() => {
        const interval = setInterval(() => setSecs(prev => prev - 1), 1000);
        setTimeout(() => navigate('/'), secs * 1000);
        return () => { clearInterval(interval); };
    }, []);

    return (
        <span className="stay content-wrapper">
            <section className="error-page flex justify-center">
                <span className="error-txt">
                    <h1>Oops!</h1>
                    <h3>Something went wrong...</h3>
                    <p>You are redirected back to the home page in... {secs}</p>
                </span>
                <img src={ErrorGif} alt="Error animation" />
            </section>
        </span>
    );
};