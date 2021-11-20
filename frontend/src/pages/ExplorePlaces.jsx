import { useEffect } from 'react';

export const ExplorePlaces = () => {
    useEffect(() => { document.title = `HomeAway: Explore...`; }, []);

    return (
        <section className="explore content-wrapper">
            <h1>Search results here</h1>
            <p>wow so many results</p>
        </section>
    )
}