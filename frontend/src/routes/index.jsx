import { createBrowserRouter } from 'react-router-dom';

// // project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import LandingPageRoutes from './LandingPageRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([LandingPageRoutes, MainRoutes, LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
