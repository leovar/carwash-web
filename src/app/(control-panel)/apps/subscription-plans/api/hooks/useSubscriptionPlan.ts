import { useQuery } from '@tanstack/react-query';
import { subscriptionPlansApi } from '../services/subscriptionPlansApi';

export const useSubscriptionPlan = (id: string) => {
	return useQuery({
		queryKey: ['subscription-plan', id],
		queryFn: () => subscriptionPlansApi.getSubscriptionPlan(id),
		enabled: !!id && id !== 'new'
	});
};