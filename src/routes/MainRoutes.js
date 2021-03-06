import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() =>
    import ('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() =>
    import ('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() =>
    import ('views/utilities/Color')));
const AdminUsers = Loadable(lazy(() =>
    import ('views/utilities/AdminUsers')));
const UtilsShadow = Loadable(lazy(() =>
    import ('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() =>
    import ('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() =>
    import ('views/utilities/TablerIcons')));
const Prediction = Loadable(lazy(() =>
    import ('views/dashboard/Default/Prediction')));
// sample page routing
const SamplePage = Loadable(lazy(() =>
    import ('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: < MainLayout / > ,
    children: [{
            path: '/',
            element: < DashboardDefault / >
        },
        {
            path: '/dashboard/default',
            element: < DashboardDefault / >
        },
        {
            path: '/dashboard/analysis',
            element: < Prediction / >
        },
        {
            path: '/utils/util-typography',
            element: < UtilsTypography / >
        },
        {
            path: '/utils/util-users-admin',
            element: < AdminUsers name="admin" / >
        },
        {
            path: '/utils/util-users-stockist',
            element: < AdminUsers name="stockist" / >
        },
        {
            path: '/utils/util-users-cashier',
            element: < AdminUsers name="cashier" / >
        },
        {
            path: '/icons/material-icons',
            element: < UtilsMaterialIcons / >
        },
        {
            path: '/sample-page',
            element: < SamplePage / >
        }
    ]
};

export default MainRoutes;
