import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';
import tr from './navigation-i18n/tr';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('es', 'navigation', es);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'example-component',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: 'lucide:star',
		url: 'example'
	},
	{
		id: 'apps',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		children: [
			{
				id: 'companies',
				title: 'Companies',
				translate: 'COMPANIES',
				type: 'item',
				icon: 'lucide:building',
				url: 'apps/companies'
			},
			{
				id: 'subscription-plans',
				title: 'Subscription Plans',
				translate: 'SUBSCRIPTION_PLANS',
				type: 'item',
				icon: 'lucide:credit-card',
				url: 'apps/subscription-plans'
			}
		]
	}
];

export default navigationConfig;
