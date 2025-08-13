import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const CompaniesView = lazy(() => import('./components/views/CompaniesView'));
const CompanyView = lazy(() => import('./components/views/company/CompanyView'));

/**
 * The Companies page route.
 */
const route: FuseRouteItemType = {
	path: 'apps/companies',
	children: [
		{
			path: '',
			element: <CompaniesView />
		},
		{
			path: ':companyId',
			element: <CompanyView />
		}
	]
};

export default route;
