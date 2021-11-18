import { HomePage } from './pages/HomePage';
import { ExplorePlaces } from './pages/ExplorePlaces';
import { StayDetails } from './pages/StayDetails';

export const routes = [
    {
        path: '/stay/:id',
        element: <StayDetails />,
    },
    {
        path: '/explore',
        element: <ExplorePlaces />,
    },
    {
        path: '*',
        element: <HomePage />,
    },
];