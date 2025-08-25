import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { SubscriptionPlan } from '../api/types';

const SubscriptionPlanModel = (data: PartialDeep<SubscriptionPlan>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('subscription-plan-'),
		annualPrice: 0,
		country: '',
		createdDate: new Date(),
		description: '',
		isActive: true,
		licensePeriod: 12,
		monthlyPrice: 0,
		name: '',
		nonExpiringLicense: false
	});

export default SubscriptionPlanModel;