import { HomePage } from './pages/HomePage';
import { ExplorePlaces } from './pages/ExplorePlaces';
import { StayDetails } from './pages/StayDetails';
import { SaveStay } from './pages/SaveStay';
import { ErrorPage } from './pages/ErrorPage';


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
        path: '/oops',
        element: <ErrorPage />
    },
    {
        path: '/admin/save',
        element: <SaveStay />,
    },
    {
        path: '*',
        element: <HomePage />,
    },
];