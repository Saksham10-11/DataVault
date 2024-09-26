import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoutes';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const FormBuilder = Loadable(lazy(() => import('pages/component-overview/formBuilder')));
const Home = Loadable(lazy(() => import('pages/component-overview/Home')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/dashboard/default',
      element: <Home />
    },
    {
      path: '/color',
      element: <Color />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: '/shadow',
      element: <Shadow />
    },
    {
      path: '/typography',
      element: <Typography />
    },
    {
      path: '/form-builder',
      element: <FormBuilder />
    }
  ]
};

export default MainRoutes;
