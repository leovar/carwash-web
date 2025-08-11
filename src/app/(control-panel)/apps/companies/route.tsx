import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const CompaniesView = lazy(() => import('./components/views/CompaniesView'));

/**
 * The Companies page route.
 */
const route: FuseRouteItemType = {
	path: 'apps/companies',
	element: <CompaniesView />
};

export default route;