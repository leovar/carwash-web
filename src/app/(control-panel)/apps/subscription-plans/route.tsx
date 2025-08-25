import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const SubscriptionPlansView = lazy(() => import('./components/views/SubscriptionPlansView'));
const SubscriptionPlanView = lazy(() => import('./components/views/subscription-plan/SubscriptionPlanView'));

/**
 * The Subscription Plans page route.
 */
const route: FuseRouteItemType = {
	path: 'apps/subscription-plans',
	children: [
		{
			path: '',
			element: <SubscriptionPlansView />
		},
		{
			path: ':subscriptionPlanId',
			element: <SubscriptionPlanView />
		}
	]
};

export default route;