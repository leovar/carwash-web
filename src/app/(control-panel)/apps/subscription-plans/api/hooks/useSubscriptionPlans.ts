import { useQuery } from '@tanstack/react-query';
import { subscriptionPlansApi } from '../services/subscriptionPlansApi';

export const useSubscriptionPlans = () => {
	return useQuery({
		queryKey: ['subscription-plans'],
		queryFn: subscriptionPlansApi.getSubscriptionPlans
	});
};